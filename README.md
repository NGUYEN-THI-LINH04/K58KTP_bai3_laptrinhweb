# K58KTP_bai3_laptrinhweb
Yêu cầu     : LẬP TRÌNH ỨNG DỤNG WEB trên nền linux
1. Cài đặt môi trường linux: SV chọn 1 trong các phương án
 - enable wsl: cài đặt docker desktop
 - enable wsl: cài đặt ubuntu
 - sử dụng Hyper-V: cài đặt ubuntu
 - sử dụng VMware : cài đặt ubuntu
 - sử dụng Virtual Box: cài đặt ubuntu
2. Cài đặt Docker (nếu dùng docker desktop trên windows thì nó có ngay)
3. Sử dụng 1 file docker-compose.yml để cài đặt các docker container sau: 
   mariadb (3306), phpmyadmin (8080), nodered/node-red (1880), influxdb (8086), grafana/grafana (3000), nginx (80,443)
4. Lập trình web frontend+backend:
 SV chọn 1 trong các web sau:
 4.1 Web thương mại điện tử
 - Tạo web dạng Single Page Application (SPA), chỉ gồm 1 file index.html, toàn bộ giao diện do javascript sinh động.
 - Có tính năng login, lưu phiên đăng nhập vào cookie và session
   Thông tin login lưu trong cơ sở dữ liệu của mariadb, được dev quản trị bằng phpmyadmin, yêu cầu sử dụng mã hoá khi gửi login.
   Chỉ cần login 1 lần, bao giờ logout thì mới phải login lại.
 - Có tính năng liệt kê các sản phẩm bán chạy ra trang chủ
 - Có tính năng liệt kê các nhóm sản phẩm
 - Có tính năng liệt kê sản phẩm theo nhóm
 - Có tính năng tìm kiếm sản phẩm
 - Có tính năng chọn sản phẩm (đưa sản phẩm vào giỏ hàng, thay đổi số lượng sản phẩm trong giỏ, cập nhật tổng tiền)
 - Có tính năng đặt hàng, nhập thông tin giao hàng => được 1 đơn hàng.
 - Có tính năng dành cho admin: Thống kê xem có bao nhiêu đơn hàng, call để xác nhận và cập nhật thông tin đơn hàng. chuyển cho bộ phận đóng gói, gửi bưu điện, cập nhật mã COD, tình trạng giao hàng, huỷ hàng,...
 - Có tính năng dành cho admin: biểu đồ thống kê số lượng mặt hàng bán được trong từng ngày. (sử dụng grafana)
 - backend: sử dụng nodered xử lý request gửi lên từ javascript, phản hồi về json.
 4.2 Web IOT: Giám sát dữ liệu IOT.
 - Tạo web dạng Single Page Application (SPA), chỉ gồm 1 file index.html, toàn bộ giao diện do javascript sinh động.
 - Có tính năng login, lưu phiên đăng nhập vào cookie và session
   Thông tin login lưu trong cơ sở dữ liệu của mariadb, được dev quản trị bằng phpmyadmin, yêu cầu sử dụng mã hoá khi gửi login.
   Chỉ cần login 1 lần, bao giờ logout thì mới phải login lại.
 - hiển thị giá trị mới nhất của các thông số đang giám sát, khi click vào thì hiển thị đồ thị lịch sử quá trình thay đổi (gọi grafana iframe để hiển thị)
 - backend: Sử dụng nodered để đọc dữ liệu từ các cảm biến (có thể dùng api online để lấy dữ liệu theo giời gian thực), 
   nodered sẽ lưu dữ liệu mới nhất (dạng update) vào cơ sở dữ liệu mariadb (sử dụng phpmyadmin để tạp table và quản trị lần đầu)
   nodered sẽ lưu dữ liệu (insert) vào influxdb để lưu giá trị lịch sử, để cho grafana dùng để hiển thị biểu đồ.
5. Nginx làm web-server
 - Cấu hình nginx để chạy được website qua url http://fullname.com  (thay fullname bằng chuỗi ko dấu viết liền tên của bạn)
 - Cấu hình nginx để http://fullname.com/nodered truy cập vào nodered qua cổng 80, (dù nodered đang chạy ở port 1880)
 - Cấu hình nginx để http://fullname.com/grafana truy cập vào grafana qua cổng 80, (dù grafana đang chạy ở port 3000)

Yêu cầu sinh viên lưu code trên github
có file readme.md có hình ảnh + text: ghi lại nhật ký quá trình làm bài.

CÁCH ĐÁNH GIÁ:
1. Cài đặt được môi trường: 1đ
2. Cài đặt được các docker container với cấu hình phù hợp: 1đ
3. Web chạy được, giao diện phù hợp, chạy trên web sever nginx: 2đ
4. nodered api trả về json, test được: 2đ
5. front-end có js gọi được api nodered, nhận về json, hiển thị được kết quả từ json này. 2đ
6. Bài làm có dấu ấn, giải thích rõ ràng, hiểu vấn đề: 2đ
# Bài làm
# Cấu trúc dự án

<img width="333" height="472" alt="image" src="https://github.com/user-attachments/assets/89b6159e-8b5f-43c4-9d21-33363cff39cb" />

### 1. Cài đặt môi trường linux sử dụng VMware: cài đặt ubuntu
   <img width="433" height="433" alt="Ảnh chụp màn hình 2025-11-04 103439" src="https://github.com/user-attachments/assets/f042ea56-5f3b-4372-a48a-21dd04f4dd67" />
   
### 2 . Cài đặt docker trong ubuntu
- Bước 1: Cập nhật hệ thống.
sudo apt update && sudo apt upgrade -y
- Bước 2: Cài đặt gói hỗ trợ HTTPS cho apt.
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release -y
- Thêm key
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker.gpg
- Thêm Docker repo vào hệ thống
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
- Cập nhật danh sách gói vài cài Docker.
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
- Bước 3. Cho phép usue hiện tại chạy Docker mà không cần sudo
sudo usermod -aG docker $USER
newgrp docker
## 3. Sử dụng 1 file docker-compose.yml để cài đặt các docker container sau: 
### Tạo file docker-compose.yml
```version: "3.9"

services:
  mariadb:
    image: mariadb:10.5
    container_name: mariadb
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: 12345
      MYSQL_DATABASE: ecommerce
      MYSQL_USER: admin
      MYSQL_PASSWORD: 12345
    ports:
      - "3306:3306"
    volumes:
      - ./mariadb/data:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: phpmyadmin
    restart: always
    environment:
      PMA_HOST: mariadb
      MYSQL_ROOT_PASSWORD: 12345
    ports:
      - "8080:80"

  influxdb:
    image: influxdb:1.8
    container_name: influxdb
    restart: always
    ports:
      - "8086:8086"
    volumes:
      - ./influxdb/data:/var/lib/influxdb

  nodered:
    image: nodered/node-red
    container_name: nodered
    restart: always
    ports:
      - "1880:1880"
    volumes:
      - ./node-red/data:/data
    depends_on:
      - mariadb
      - influxdb

  grafana:
    image: grafana/grafana
    container_name: grafana
    restart: always
    ports:
      - "3000:3000"
    volumes:
      - ./grafana/data:/var/lib/grafana
    environment:
      - GF_SERVER_ROOT_URL=http://nguyenthilinh.com/grafana
      - GF_SERVER_SERVE_FROM_SUB_PATH=false
      - GF_SECURITY_ALLOW_EMBEDDING=true
      - GF_AUTH_ANONYMOUS_ENABLED=true
      - GF_AUTH_ANONYMOUS_ORG_ROLE=Viewer
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=123456
    depends_on:
      - influxdb

  nginx:
    image: nginx:latest
    container_name: nginx
    restart: always
    ports:
      - "80:80"
    volumes:
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
      - ./web:/usr/share/nginx/html
    depends_on:
      - grafana
      - nodered
```
### Chạy toàn bộ container

docker compose up-d
<img width="846" height="626" alt="Screenshot 2025-11-03 112853" src="https://github.com/user-attachments/assets/5d73eedd-d717-4db9-b544-803281ca669e" />

## 4.2. Web IOT: Giám sát dữ liệu IOT.
- Tạo cơ sở dữ liệu trong phpMyAdmin

  <img width="874" height="402" alt="Screenshot 2025-11-05 161033" src="https://github.com/user-attachments/assets/d4925914-6946-4bc8-8a63-ca36ab0e22d8" />

- Tạo Nodered để kết nối với MariaDB
  
  <img width="762" height="370" alt="Screenshot 2025-11-06 032302" src="https://github.com/user-attachments/assets/b653e923-d254-4618-8c46-d9925dc7d4d4" />

- Có tính năng login, lưu phiên đăng nhập vào cookie và session

  <img width="881" height="874" alt="Screenshot 2025-11-06 023127" src="https://github.com/user-attachments/assets/1c02d9b2-f455-4dde-a770-b8f01a6c49f7" />

- Kết quả test http://nguyenthilinh.com:1880/api/latest trả về JSON

  <img width="653" height="147" alt="Screenshot 2025-11-06 031712" src="https://github.com/user-attachments/assets/77cde825-1f3f-4b24-a740-7164e45d064c" />

  <img width="700" height="525" alt="Screenshot 2025-11-06 020326" src="https://github.com/user-attachments/assets/0f56fc89-c148-47be-8a9d-930fcf92677e" />

- Kết quả test http://nguyenthilinh.com:1880/api/login
  <img width="692" height="99" alt="Screenshot 2025-11-06 032254" src="https://github.com/user-attachments/assets/ccb63f3e-be08-4038-9fc0-4c31b158b098" />

-  nodered sẽ lưu dữ liệu mới nhất (dạng update) vào cơ sở dữ liệu mariadb (sử dụng phpmyadmin để tạp table và quản trị lần đầu)

<img width="895" height="877" alt="Screenshot 2025-11-06 023139" src="https://github.com/user-attachments/assets/5421ed5c-9b0c-4d82-a31d-98dc08693e34" />

### 4.2.1.Giao diện web hiển thị cảm biến
<img width="888" height="849" alt="Screenshot 2025-11-06 024234" src="https://github.com/user-attachments/assets/7fb86548-5193-4fa0-aec5-19de27c98dad" />


## 5.CẤU HÌNH NGINX
### File nginx/default.conf:
```
server {
    listen 80;
    server_name nguyenthilinh.com www.nguyenthilinh.com;

    # === Gốc: SPA Frontend (Web IoT) ===
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # === Node-RED UI (Subpath /nodered) ===
    location ^~ /nodered/ {
        proxy_pass http://nodered:1880/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Sửa đường dẫn tĩnh trong giao diện Node-RED
        sub_filter_once off;
        sub_filter 'href="/'  'href="/nodered/';
        sub_filter 'src="/'   'src="/nodered/';
        sub_filter 'action="/' 'action="/nodered/';
        sub_filter_types text/css text/javascript text/html application/javascript;
        proxy_set_header Accept-Encoding "";
    }

    # === Node-RED API (Subpath /api) ===
    location ^~ /api/ {
        proxy_pass http://nodered:1880/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Cho phép CORS (tránh lỗi khi fetch API)
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
        add_header Access-Control-Allow-Headers 'Origin, Content-Type, Accept, Authorization';

        # Xử lý preflight request
        if ($request_method = OPTIONS) {
            return 204;
        }
    }

        # === Grafana (Subpath /grafana) ===
     location /grafana/ {
        proxy_pass http://grafana:3000/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
    # === Bảo mật Header ===
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # === 404 fallback cho SPA ===
    error_page 404 /index.html;
}

```
### Website chính :👉 http://nguyenthilinh.com
<img width="1280" height="592" alt="image" src="https://github.com/user-attachments/assets/43e906d6-6e9f-4f8d-915f-e76524bace7e" />

### Node-RED:👉http://nguyenthilinh.com/nodered
<img width="1280" height="592" alt="image" src="https://github.com/user-attachments/assets/2e9034dd-a2b5-477e-869f-dea4d585d009" />

### Grafana: 👉http://nguyenthilinh.com/grafana
<img width="760" height="663" alt="Screenshot 2025-11-03 135533" src="https://github.com/user-attachments/assets/a2f412b2-24b3-4318-a90f-a64f8de87c5e" />

## 6.KẾT LUẬN
- Qua quá trình làm bài em đã biết cách tải Ubuntu trên máy ảo VMware 





