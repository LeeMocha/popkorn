import React, { useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function Attendance() {
  const url = '';

  return (
    <div>
      <QRCodeCanvas value={`http://192.168.0.96:8080/api/attendance/insert?id=${sessionStorage.getItem("loginID")}`} />
    </div>
  );
}
