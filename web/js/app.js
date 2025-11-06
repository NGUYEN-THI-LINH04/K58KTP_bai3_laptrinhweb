const API = "http://nguyenthilinh.com/api";
const GRAFANA_URL = "http://nguyenthilinh.com/grafana";
const GRAFANA_DASHBOARD = "adh8mrh";

// === LOGIN ===
async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    document.getElementById("msg").innerText = "Vui lòng nhập đầy đủ thông tin!";
    return;
  }

  const res = await fetch(API + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.status === "ok") {
    localStorage.setItem("token", data.token);
    showDashboard();
  } else {
    document.getElementById("msg").innerText = "Sai tài khoản hoặc mật khẩu!";
  }
}

// === ÁNH XẠ TÊN CẢM BIẾN THÂN THIỆN ===
function mapSensorName(id) {
  const mapping = {
    "sensor01": "Cảm biến nhiệt độ",
    "sensor02": "Cảm biến độ ẩm",
    "sensor03": "Cảm biến ánh sáng",
    "sensor04": "Cảm biến khí gas",
    "sensor05": "Cảm biến độ ẩm đất",
    "temp": "Cảm biến nhiệt độ",
    "hum": "Cảm biến độ ẩm",
    "light": "Cảm biến ánh sáng",
    "gas": "Cảm biến khí gas",
    "soil": "Cảm biến độ ẩm đất"
  };
  return mapping[id] || id || "Cảm biến không tên";
}

// === LOAD SENSOR DATA ===
async function loadSensors() {
  const token = localStorage.getItem("token");
  const res = await fetch(API + "/latest", {
    headers: { "Authorization": "Bearer " + token }
  });

  if (res.status === 401) {
    logout();
    return;
  }

  const data = await res.json();
  const list = document.getElementById("sensor-list");
  list.innerHTML = "";

  // ✅ Kiểm tra dữ liệu trả về
  if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
    list.innerHTML = "<p style='color:#f87171;'>Không có dữ liệu cảm biến!</p>";
    return;
  }

  // ✅ Duyệt và hiển thị từng cảm biến
  data.data.forEach(sensor => {
    const name = mapSensorName(sensor.sensor_id);
    const value = sensor.value ?? "Không có dữ liệu";
    const div = document.createElement("div");
    div.innerHTML = `<b>${name}</b>: ${value}`;
    div.onclick = () => showGrafana(sensor.sensor_id);
    list.appendChild(div);
  });
}

// === SHOW GRAFANA ===
function showGrafana(sensorId) {
  const iframe = document.getElementById("grafana-frame");
  iframe.style.display = "block";
  iframe.src = `${GRAFANA_URL}/d/${GRAFANA_DASHBOARD}?orgId=1&var-sensor=${sensorId}&refresh=5s`;
}

// === SHOW DASHBOARD ===
function showDashboard() {
  document.getElementById("login-box").style.display = "none";
  document.getElementById("dashboard").style.display = "flex";
  loadSensors();
  setInterval(loadSensors, 5000);
}

// === LOGOUT ===
function logout() {
  localStorage.removeItem("token");
  document.getElementById("dashboard").style.display = "none";
  document.getElementById("login-box").style.display = "flex";
}

// === AUTO LOGIN ===
window.onload = () => {
  if (localStorage.getItem("token")) showDashboard();
};

