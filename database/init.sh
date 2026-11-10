#!/usr/bin/env bash

# ==============================================================================
# Script Khởi Tạo & Quản Trị Cơ Sở Dữ Liệu PostgreSQL (Carbon Ledger)
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCHEMA_FILE="${SCRIPT_DIR}/01_schema.sql"
SEED_FILE="${SCRIPT_DIR}/02_seed.sql"
COMPOSE_FILE="${SCRIPT_DIR}/docker-compose.yml"

DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-carbon_ledger}"
DB_USER="${DB_USER:-carbon_admin}"
DB_PASSWORD="${DB_PASSWORD:-carbon_secret}"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_banner() {
    echo -e "${BLUE}"
    echo "================================================================================"
    echo "  🌱 CARBON LEDGER - KHỞI TẠO CƠ SỞ DỮ LIỆU POSTGRESQL 16"
    echo "================================================================================"
    echo -e "${NC}"
}

usage() {
    echo "Sử dụng: $0 [docker|local|reset|verify|help]"
    echo ""
    echo "Lựa chọn:"
    echo "  docker   : Khởi chạy PostgreSQL qua Docker Compose và tự động nạp schema/seed (Mặc định)"
    echo "  local    : Chạy schema và seed lên PostgreSQL server đang chạy trên máy (dùng psql)"
    echo "  reset    : Xóa volume dữ liệu cũ và khởi tạo lại toàn bộ database từ đầu bằng Docker"
    echo "  verify   : Kiểm tra kết nối và thống kê số lượng bản ghi các bảng"
    echo "  help     : Hiển thị hướng dẫn này"
    echo ""
}

run_docker() {
    echo -e "${YELLOW}🚀 Đang khởi động PostgreSQL 16 container qua Docker Compose...${NC}"
    docker-compose -f "${COMPOSE_FILE}" up -d
    echo -e "${GREEN}✓ Container PostgreSQL đã khởi chạy thành công.${NC}"
    echo -e "${BLUE}ℹ Chờ 3 giây để PostgreSQL hoàn tất nạp script khởi tạo...${NC}"
    sleep 3
    verify_db_docker
}

run_reset() {
    echo -e "${YELLOW}⚠️  Đang xóa bỏ container và volume dữ liệu cũ...${NC}"
    docker-compose -f "${COMPOSE_FILE}" down -v
    echo -e "${GREEN}✓ Đã dọn dẹp sạch sẽ.${NC}"
    run_docker
}

run_local() {
    if ! command -v psql &> /dev/null; then
        echo -e "${RED}❌ Lỗi: Không tìm thấy công cụ 'psql' trên hệ thống. Vui lòng cài đặt postgresql-client hoặc sử dụng chế độ Docker.${NC}"
        exit 1
    fi

    echo -e "${YELLOW}🔄 Đang kết nối tới PostgreSQL tại ${DB_HOST}:${DB_PORT}/${DB_NAME} với user ${DB_USER}...${NC}"
    export PGPASSWORD="${DB_PASSWORD}"

    echo -e "${BLUE}📄 Đang thực thi 01_schema.sql...${NC}"
    psql -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d "${DB_NAME}" -f "${SCHEMA_FILE}"

    echo -e "${BLUE}🌱 Đang thực thi 02_seed.sql...${NC}"
    psql -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d "${DB_NAME}" -f "${SEED_FILE}"

    echo -e "${GREEN}✓ Đã nạp thành công Schema & Seed Data vào database cục bộ!${NC}"
    verify_db_local
}

verify_db_docker() {
    echo -e "\n${BLUE}🔍 Đang kiểm tra dữ liệu trong Docker Container...${NC}"
    docker exec -e PGPASSWORD="${DB_PASSWORD}" carbonledger-postgres psql -U "${DB_USER}" -d "${DB_NAME}" -c "
    SELECT table_name, 
           (xpath('/row/cnt/text()', xml_count))[1]::text::int as record_count
    FROM (
      SELECT table_name, 
             query_to_xml(format('select count(*) as cnt from %I', table_name), false, true, '') as xml_count
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    ) t
    ORDER BY table_name;
    "
    print_connection_info
}

verify_db_local() {
    echo -e "\n${BLUE}🔍 Đang kiểm tra dữ liệu qua psql...${NC}"
    export PGPASSWORD="${DB_PASSWORD}"
    psql -h "${DB_HOST}" -p "${DB_PORT}" -U "${DB_USER}" -d "${DB_NAME}" -c "
    SELECT table_name, 
           (xpath('/row/cnt/text()', xml_count))[1]::text::int as record_count
    FROM (
      SELECT table_name, 
             query_to_xml(format('select count(*) as cnt from %I', table_name), false, true, '') as xml_count
      FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    ) t
    ORDER BY table_name;
    "
    print_connection_info
}

print_connection_info() {
    echo -e "\n${GREEN}================================================================================${NC}"
    echo -e "${GREEN}✨ CƠ SỞ DỮ LIỆU ĐÃ SẴN SÀNG! THÔNG TIN KẾT NỐI:${NC}"
    echo -e "   - Host     : ${DB_HOST}"
    echo -e "   - Port     : ${DB_PORT}"
    echo -e "   - Database : ${DB_NAME}"
    echo -e "   - User     : ${DB_USER}"
    echo -e "   - Password : ${DB_PASSWORD}"
    echo -e "   - JDBC URL : jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}"
    echo -e "${GREEN}================================================================================${NC}"
}

# --- Main Entry ---
print_banner

ACTION="${1:-docker}"

case "${ACTION}" in
    docker)
        run_docker
        ;;
    local)
        run_local
        ;;
    reset)
        run_reset
        ;;
    verify)
        if docker ps | grep -q carbonledger-postgres; then
            verify_db_docker
        else
            run_local
        fi
        ;;
    help|--help|-h)
        usage
        ;;
    *)
        echo -e "${RED}Lệnh không hợp lệ: ${ACTION}${NC}\n"
        usage
        exit 1
        ;;
esac
