# Sử dụng image chứa Node.js 20
FROM node:20

# Cài đặt các gói cần thiết để cài đặt HandBrakeCLI
RUN apt-get update && apt-get install -y handbrake-cli

# Thêm thư mục app và thiết lập thư mục làm việc
WORKDIR /app

# Sao chép mã nguồn ứng dụng vào thư mục làm việc trong container
COPY . .

# Cài đặt các thư viện Node.js bằng npm
RUN npm install

# Mở cổng mạng cho ứng dụng
EXPOSE 3000

# Chạy ứng dụng
CMD [ "npm", "start" ]
