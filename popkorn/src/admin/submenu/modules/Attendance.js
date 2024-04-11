import React, { useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function Attendance() {
  const url = '';

  return (
    <div>
      <QRCodeCanvas value={url} />
    </div>
  );
}
