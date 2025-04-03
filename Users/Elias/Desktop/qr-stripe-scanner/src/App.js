import React, { useState } from 'react';
import { QrReader } from 'react-qr-scanner';
import jsQR from 'jsqr';

function App() {
  const [data, setData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleScan = (result) => {
    if (result) {
      parseQRData(result.text);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleUpload = () => {
    if (!imageFile) {
      alert('Vennligst last opp et bilde først.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);

          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const code = jsQR(imageData.data, img.width, img.height);

          if (code) {
            console.log('Dekodet QR-kode:', code.data);
            parseQRData(code.data);
          } else {
            alert('Kunne ikke finne en QR-kode i bildet. Prøv et annet bilde.');
          }
        } catch (error) {
          console.error('Feil ved QR-lesing:', error);
          alert('En feil oppstod ved lesing av QR-kode.');
        }
      };

      img.onerror = () => {
        alert('Kunne ikke laste bildet. Prøv et annet format.');
      };
    };
    reader.readAsDataURL(imageFile);
  };

  const parseQRData = async (text) => {
    text = text.trim().replace(/-\[\]$/, ''); // Fjerner uønsket '-[]' på slutten
    const parts = text.split('-');
    console.log('Parsed parts:', parts);

    if (parts.length === 8) {
      setData({
        name: parts[0],
        email: parts[1],
        phone: parts[2],
        day: parts[5],
        month: parts[4],
        year: parts[3],
        time: parts[6],
        address: parts[7],
      });

      // Sjekk bestilling i Stripe via serverless-funksjonen
      const response = await fetch(`/api/check-order?email=${parts[1]}`);
      const orderInfo = await response.json();
      setOrderData(orderInfo);
    } else {
      alert('Feil format på QR-kode. Sørg for at verdiene er riktig separert med "-"');
      setData(null);
    }
  };

  return (
    <div className="App">
      <h1>QR Scanner</h1>
      <QrReader onResult={handleScan} constraints={{ facingMode: 'environment' }} />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Skann</button>
      {data && (
        <div>
          <p><strong>Navn:</strong> {data.name}</p>
          <p><strong>E-Post:</strong> {data.email}</p>
          <p><strong>Tlf nr:</strong> {data.phone}</p>
          <p><strong>Dato:</strong> {data.day}-{data.month}-{data.year}</p>
          <p><strong>Klokkeslett:</strong> {data.time}</p>
          <p><strong>Adresse:</strong> {data.address}</p>
        </div>
      )}
      {orderData && (
        <div>
          <p><strong>Produkt:</strong> {orderData.product}</p>
          <p><strong>Quantity:</strong> {orderData.quantity}</p>
          <p><strong>Sluttpris:</strong> {orderData.totalPrice}</p>
        </div>
      )}
    </div>
  );
}

export default App;
