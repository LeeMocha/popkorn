import React, { useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function Attendance() {
  const url = '';

  return (
    <div>
      <QRCodeCanvas value={`http://3.35.11.217:8080/api/attendance/insert?id=${sessionStorage.getItem("loginID")}`} />
    </div>
  );
}
