import React, { useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function Attendance() {
  const url = '';

  // QR 출석체크 확인 로직 구현해야함

  return (
    <div>
      <QRCodeCanvas value={`http://3.35.11.217:8080/api/attendance/insert?id=${sessionStorage.getItem("loginID")}`} />
    </div>
  );
}
