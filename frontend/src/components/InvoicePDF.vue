<script setup lang="ts">
import { ref } from "vue";
import html2pdf from "html2pdf.js";

// Invoice data (replace with real data)
const invoiceData = ref({
  customerName: "John Doe",
  customerEmail: "johndoe@example.com",
  bookingTime: "14:30 PM",
  bookingDate: "2025-02-14",
  totalPrice: "$250.00",
  carModel: "Toyota Corolla",
  carType: "Sedan",
  discount: "10%"
});

const downloadPDF = () => {
  const content = document.createElement("div");
  content.innerHTML = `
    <div style="
      font-family: Arial, sans-serif; 
      width: 100%; 
      max-width: 650px; 
      margin: 20px auto; 
      padding: 20px;
      background-color: #fff;
      border: 1px solid #ddd;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
    ">
      <h2 style="text-align: center; font-size: 22px; margin-bottom: 10px;">Billing Invoice</h2>
      <hr style="border: 1px solid #ccc; margin: 10px 0;"/>
      <p style="font-size: 14px; margin-bottom: 5px;"><strong>Customer Name:</strong> ${invoiceData.value.customerName}</p>
      <p style="font-size: 14px; margin-bottom: 5px;"><strong>Customer Email:</strong> ${invoiceData.value.customerEmail}</p>
      <p style="font-size: 14px; margin-bottom: 5px;"><strong>Booking Time:</strong> ${invoiceData.value.bookingTime}</p>
      <p style="font-size: 14px; margin-bottom: 5px;"><strong>Booking Date:</strong> ${invoiceData.value.bookingDate}</p>
      <p style="font-size: 14px; margin-bottom: 5px;"><strong>Car Model:</strong> ${invoiceData.value.carModel}</p>
      <p style="font-size: 14px; margin-bottom: 5px;"><strong>Car Type:</strong> ${invoiceData.value.carType}</p>
      <p style="font-size: 14px; margin-bottom: 5px;"><strong>Discount:</strong> ${invoiceData.value.discount}</p>
      <p style="font-size: 16px; font-weight: bold; color: green; margin-top: 10px;"><strong>Total Price:</strong> ${invoiceData.value.totalPrice}</p>
      <hr style="border: 1px solid #ccc; margin: 10px 0;"/>
      <p style="text-align: center; font-size: 12px; color: gray; margin-top: 10px;">Thank you for your booking!</p>
    </div>
  `;

  html2pdf().from(content).set({
    margin: [15, 15, 15, 15], // Margins: top, right, bottom, left
    autoPaging: 'text',
    filename: "invoice.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 3, logging: false, useCORS: true, ignoreElements: (element) => element.classList.contains("no-pdf") },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] }
  }).save();
};

// Expose function for parent component
defineExpose({ downloadPDF });
</script>
