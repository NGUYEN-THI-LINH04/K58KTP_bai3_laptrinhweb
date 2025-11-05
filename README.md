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

<img width="787" height="495" alt="Screenshot 2025-11-04 222024" src="https://github.com/user-attachments/assets/f5d980ae-3286-4d15-91a9-424e64dab106" />

<img width="627" height="618" alt="image" src="https://github.com/user-attachments/assets/caf7e006-f4c4-4a4a-82d0-9337fe45a43f" />

<img width="627" height="430" alt="image" src="https://github.com/user-attachments/assets/54e20b52-ddb7-4a38-bf3c-da3ac53ff261" />

### Chạy toàn bộ container
docker compose up-d
<img width="846" height="626" alt="Screenshot 2025-11-03 112853" src="https://github.com/user-attachments/assets/5d73eedd-d717-4db9-b544-803281ca669e" />

## 5.CẤU HÌNH NGINX
### File nginx/default.conf:

server {
    listen 80;
    server_name nguyenthilinh.com;
    
    root /usr/share/nginx/html;
    index index.html;
    # Trang chủ SPA
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Node-RED proxy
    location /nodered/ {
        proxy_pass http://nodered:1880/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Grafana proxy
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
}
### Website chính :👉 http://nguyenthilinh.com
<img width="1280" height="592" alt="image" src="https://github.com/user-attachments/assets/43e906d6-6e9f-4f8d-915f-e76524bace7e" />

### Node-RED:👉http://nguyenthilinh.com/nodered
<img width="1280" height="592" alt="image" src="https://github.com/user-attachments/assets/2e9034dd-a2b5-477e-869f-dea4d585d009" />

### Grafana: 👉http://nguyenthilinh.com/grafana
<img width="760" height="663" alt="Screenshot 2025-11-03 135533" src="https://github.com/user-attachments/assets/a2f412b2-24b3-4318-a90f-a64f8de87c5e" />







