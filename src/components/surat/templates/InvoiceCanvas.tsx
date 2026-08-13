import Image from "next/image";
import { useSuratPagination } from "../useSuratPagination";
import { Globe } from "lucide-react";

interface InvoiceCanvasProps {
  formData: any;
  signatureData: string | null;
}

export function InvoiceCanvas({ formData, signatureData }: InvoiceCanvasProps) {
  useSuratPagination([formData, signatureData]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(date);
    } catch {
      return dateStr;
    }
  };

  const invoiceDate = formatDate(formData.invoiceDate) || "21 November 2030";
  const items = formData.invoiceItems ? JSON.parse(formData.invoiceItems) : [{ id: 1, name: 'Social Media Design', quantity: 3, price: 5 }];

  const subTotal = items.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0);
  const tax = parseFloat(formData.taxAmount) || 0;
  const total = subTotal + tax;

  const currencyCode = formData.currency || 'IDR';
  const currencyLocales: Record<string, string> = {
    IDR: 'id-ID',
    USD: 'en-US',
    EUR: 'de-DE',
    GBP: 'en-GB',
    SGD: 'en-SG'
  };
  const locale = currencyLocales[currencyCode] || 'id-ID';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: currencyCode === 'IDR' ? 0 : 2
    }).format(amount);
  };

  return (
    <div 
      className="bg-white w-full max-w-[21cm] mx-auto min-h-[29.7cm] shadow-md print:shadow-none text-black font-['Arial',_sans-serif] leading-[1.5] flex flex-col relative overflow-hidden"
      style={{ WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' } as React.CSSProperties}
    >
      
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-0 h-0 border-t-[100px] border-t-[#0b4393] border-r-[250px] border-r-transparent"></div>
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[120px] border-t-[#0b4393] border-l-[180px] border-l-transparent"></div>
      
      <div className="absolute bottom-0 left-0 w-[200px] h-0 border-b-[80px] border-b-[#0b4393] border-r-[80px] border-r-transparent"></div>
      
      {/* Padding container to keep content within printable bounds */}
      <div className="px-[20mm] py-[25mm] flex flex-col flex-1 z-10 relative">
        
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8 cv-section">
          <div className="flex items-center gap-3">
            {formData.logoData ? (
              <div className="w-12 h-12 relative flex-shrink-0">
                <img
                  src={formData.logoData}
                  alt="Logo Perusahaan"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-[#0b4393] rounded-full flex items-center justify-center text-white overflow-hidden flex-shrink-0">
                <Globe className="w-8 h-8" />
              </div>
            )}
            <div className="text-sm">
              <div className="font-bold text-[#0b4393]">{formData.companyName || "Nama Perusahaan"}</div>
              <div>{formData.companyPhone || "0812 3456 7890"}</div>
            </div>
          </div>
          <div className="text-sm font-semibold text-right pt-6">
            {invoiceDate}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-1 bg-[#0b4393] mb-8 cv-section"></div>

        {/* Title and Bill To */}
        <div className="flex justify-between items-start mb-12 cv-section">
          <div className="bg-[#0b4393] text-white py-3 px-8 text-3xl font-bold tracking-wider">
            Invoice
          </div>
          <div className="text-right text-sm">
            <div className="text-xl font-bold text-[#0b4393] mb-2">Bill To</div>
            <div className="font-medium">{formData.clientName || "Daniel Gallego"}</div>
            <div className="w-48 whitespace-pre-wrap ml-auto text-slate-700">
              {formData.clientAddress || "123 Anywhere St., Any City"}
            </div>
            <div>{formData.clientPhone || "0123 4567 8901"}</div>
          </div>
        </div>

        {/* Table */}
        <div className="mb-12 w-full cv-section">
          <div className="grid grid-cols-12 bg-[#0b4393] text-white font-bold py-2 px-4">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-right">Total</div>
          </div>
          {items.map((item: any, index: number) => (
            <div key={item.id} className={`grid grid-cols-12 py-2 px-4 text-sm ${index % 2 === 0 ? 'bg-gray-200' : 'bg-transparent'}`}>
              <div className="col-span-6">{item.name || `Item ${index + 1}`}</div>
              <div className="col-span-2 text-center">{item.quantity}</div>
              <div className="col-span-2 text-center">{formatCurrency(item.price)}</div>
              <div className="col-span-2 text-right">{formatCurrency(item.quantity * item.price)}</div>
            </div>
          ))}
        </div>

        {/* Thick line below table */}
        <div className="w-full h-1 bg-[#0b4393] mb-8 cv-section"></div>

        {/* Bottom Section */}
        <div className="flex justify-between items-start mb-8 cv-section">
          {/* Payment Method */}
          <div className="w-1/2">
            <div className="text-[#0b4393] font-bold text-lg mb-2">Payment Method</div>
            <div className="text-sm leading-tight text-slate-800">
              <div>{formData.paymentBank || "Bank Arowwai"}</div>
              <div>{formData.paymentName || "Benjamin Shah"}</div>
              <div>{formData.paymentNumber || "0123 4567 8901"}</div>
            </div>
          </div>

          {/* Totals */}
          <div className="w-1/3">
            <div className="flex justify-between text-sm font-bold text-[#0b4393] mb-1 px-4">
              <span>Sub Total</span>
              <span>{formatCurrency(subTotal)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#0b4393] mb-3 px-4">
              <span>Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold bg-[#0b4393] text-white py-2 px-4">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-[40px]"></div>

        {/* Signature */}
        <div className="flex justify-end pt-4 pb-12 cv-section">
          <div className="flex flex-col items-center min-w-[200px]">
            {signatureData ? (
              <div className="h-16 w-32 relative mb-1">
                <Image
                  src={signatureData}
                  alt="Tanda Tangan"
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="h-16 mb-1 flex items-end justify-center">
                <span className="text-gray-300 italic font-serif">Signature</span>
              </div>
            )}
            
            <div className="w-full border-b border-black mb-1"></div>
            <div className="font-bold text-[#0b4393] text-sm">
              {formData.signatureName || formData.companyName || "Nama Perusahaan"}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
