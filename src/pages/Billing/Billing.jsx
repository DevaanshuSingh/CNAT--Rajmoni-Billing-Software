import React, { useState } from 'react';
import { numberToWordsIndian } from '../../utils/numberToWords';
import './Billing.css';

/**
 * Billing Page Component
 * 
 * Client Demo Mode:
 * 1. Every column field is EDITABLE manually (Description, Pcs, HSN, Purity, Gross Wt, Net Wt, Rate, Making, Hallmark).
 * 2. Item Total Amount calculation = Rate entered (e.g. 100 in rate => total amount 100; 99 in rate => total amount 99).
 * 3. Save Invoice workflow: Must click "Save Invoice" before "Generate & Print Bill" button is visible.
 * 4. Static 3% GST breakdown (SGST 1.50% + CGST 1.50%).
 */
export default function Billing() {
  // Modal visibility state for bill print preview
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  // Invoice Saved State (Save button must be clicked before Generate & Print Bill button is enabled)
  const [isInvoiceSaved, setIsInvoiceSaved] = useState(false);

  // ------------------------------------------------------------------
  // 1. Shop Header Info
  // ------------------------------------------------------------------
  const [shopPhone, setShopPhone] = useState('9830000000 / 9831000000');
  const [shopEmail, setShopEmail] = useState('rajmonijewellers@gmail.com');
  const [shopGstin, setShopGstin] = useState('19AAAAA0000A1ZR');

  // ------------------------------------------------------------------
  // 2. Invoice Meta State
  // ------------------------------------------------------------------
  const [salesPerson, setSalesPerson] = useState('Rahul Sen');
  const [orderNo, setOrderNo] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('A000547');
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split('T')[0].split('-').reverse().join('/')
  );

  // ------------------------------------------------------------------
  // 3. Customer Details State
  // ------------------------------------------------------------------
  const [receiver, setReceiver] = useState({
    name: 'SARBANI DHAR',
    address: 'MADHYAMGRAM',
    state: '19',
    contact: '9876543210',
    gstNo: '',
    panNo: '',
    stateCode: 'STATE CODE-19-WEST BENGAL',
  });

  const [consigneeSameAsReceiver, setConsigneeSameAsReceiver] = useState(true);
  const [consignee, setConsignee] = useState({
    name: 'SARBANI DHAR',
    address: 'MADHYAMGRAM',
    state: '19',
    contact: '9876543210',
    gstNo: '',
    panNo: '',
    stateCode: 'STATE CODE-19-WEST BENGAL',
  });

  // ------------------------------------------------------------------
  // 4. Line Items State (Default item for demo)
  // ------------------------------------------------------------------
  const [items, setItems] = useState([
    {
      id: 1,
      description: 'FINGER RING',
      pcs: 7,
      hsn: '7113',
      purity: '22',
      grossWeight: 6.78,
      netWeight: 6.78,
      ratePerGm: 100, // Rate driving item total for client demo
      value: 100,
      diamondCts: 0,
      diamondAmount: 0,
      makingCharge: 0,
      hallmarkCharge: 0,
      totalAmount: 100, // Matches rate per client instruction (100 -> 100)
    },
  ]);

  // ------------------------------------------------------------------
  // 5. Payment & Financial Adjustment State
  // ------------------------------------------------------------------
  const [paymentMode, setPaymentMode] = useState('CASH');
  const [discount, setDiscount] = useState(0);
  const [amountReceived, setAmountReceived] = useState(103);
  const [advancePayment, setAdvancePayment] = useState(0);
  const [oldGoldAmount, setOldGoldAmount] = useState(0);

  /* ------------------------------------------------------------------
   * OLD CALCULATION LOGIC (Commented for reference)
   * ------------------------------------------------------------------
  const totalPcsOld = items.reduce((sum, item) => sum + (Number(item.pcs) || 0), 0);
  const totalGrossWeightOld = items.reduce((sum, item) => sum + (Number(item.grossWeight) || 0), 0);
  const totalNetWeightOld = items.reduce((sum, item) => sum + (Number(item.netWeight) || 0), 0);
  const totalValueOld = items.reduce((sum, item) => sum + (Number(item.value) || 0), 0);
  const totalDiamondCtsOld = items.reduce((sum, item) => sum + (Number(item.diamondCts) || 0), 0);
  const totalDiamondAmountOld = items.reduce((sum, item) => sum + (Number(item.diamondAmount) || 0), 0);
  const totalMakingChargeOld = items.reduce((sum, item) => sum + (Number(item.makingCharge) || 0), 0);
  const totalHallmarkChargeOld = items.reduce((sum, item) => sum + (Number(item.hallmarkCharge) || 0), 0);
  const itemsSubtotalOld = items.reduce((sum, item) => sum + (Number(item.totalAmount) || 0), 0);
  const taxableAmountOld = Math.max(0, itemsSubtotalOld - (Number(discount) || 0));
  const sgstAmountOld = Number((taxableAmountOld * 0.015).toFixed(2));
  const cgstAmountOld = Number((taxableAmountOld * 0.015).toFixed(2));
  const grandTotalOld = Math.round(taxableAmountOld + sgstAmountOld + cgstAmountOld);
  */

  // ------------------------------------------------------------------
  // NEW CALCULATION LOGIC (Client Demo: Total Amount = Rate)
  // ------------------------------------------------------------------
  const totalPcs = items.reduce((sum, item) => sum + (Number(item.pcs) || 0), 0);
  const totalGrossWeight = items.reduce((sum, item) => sum + (Number(item.grossWeight) || 0), 0);
  const totalNetWeight = items.reduce((sum, item) => sum + (Number(item.netWeight) || 0), 0);
  const totalValue = items.reduce((sum, item) => sum + (Number(item.value) || 0), 0);
  const totalDiamondCts = items.reduce((sum, item) => sum + (Number(item.diamondCts) || 0), 0);
  const totalDiamondAmount = items.reduce((sum, item) => sum + (Number(item.diamondAmount) || 0), 0);
  const totalMakingCharge = items.reduce((sum, item) => sum + (Number(item.makingCharge) || 0), 0);
  const totalHallmarkCharge = items.reduce((sum, item) => sum + (Number(item.hallmarkCharge) || 0), 0);

  // Subtotal = Sum of Item Total Amounts (which equals sum of rates)
  const itemsSubtotal = items.reduce((sum, item) => sum + (Number(item.totalAmount) || 0), 0);

  // Static 3% GST Breakdown (SGST 1.50% + CGST 1.50% = 3% Total Static GST)
  const taxableAmount = Math.max(0, itemsSubtotal - (Number(discount) || 0));
  const sgstAmount = Number((taxableAmount * 0.015).toFixed(2)); // SGST 1.50%
  const cgstAmount = Number((taxableAmount * 0.015).toFixed(2)); // CGST 1.50%
  const totalGstAmount = Number((sgstAmount + cgstAmount).toFixed(2)); // Static 3% Total GST
  const grandTotal = Math.round(taxableAmount + totalGstAmount);

  const balanceAmount =
    grandTotal -
    (Number(amountReceived) || 0) -
    (Number(advancePayment) || 0) -
    (Number(oldGoldAmount) || 0);

  const amountInWords = numberToWordsIndian(grandTotal);

  /* ------------------------------------------------------------------
   * OLD ITEM CHANGE HANDLER (Commented for reference)
   * ------------------------------------------------------------------
  const handleItemChangeOld = (index, field, val) => {
    const updated = [...items];
    const item = { ...updated[index], [field]: val };
    const netWt = Number(field === 'netWeight' ? val : item.netWeight) || 0;
    const rate = Number(field === 'ratePerGm' ? val : item.ratePerGm) || 0;
    const itemValue = Number((netWt * rate).toFixed(2));
    const diaAmt = Number(field === 'diamondAmount' ? val : item.diamondAmount) || 0;
    const making = Number(field === 'makingCharge' ? val : item.makingCharge) || 0;
    const hallmark = Number(field === 'hallmarkCharge' ? val : item.hallmarkCharge) || 0;
    item.value = itemValue;
    item.totalAmount = Number((itemValue + diaAmt + making + hallmark).toFixed(2));
    updated[index] = item;
    setItems(updated);
  };
  */

  // ------------------------------------------------------------------
  // NEW ITEM CHANGE HANDLER (All fields manually editable, total = rate)
  // ------------------------------------------------------------------
  const handleItemChange = (index, field, val) => {
    // Reset save status on edit so user must click Save Invoice again
    setIsInvoiceSaved(false);

    const updated = [...items];
    const item = { ...updated[index], [field]: val };

    // Total Amount calculation matches Rate exactly as per client instruction
    const rateVal = Number(field === 'ratePerGm' ? val : item.ratePerGm) || 0;
    item.value = rateVal;
    item.totalAmount = rateVal; // 100 -> 100, 99 -> 99

    updated[index] = item;
    setItems(updated);
  };

  const handleAddItem = () => {
    setIsInvoiceSaved(false);
    setItems([
      ...items,
      {
        id: Date.now(),
        description: 'GOLD ORNAMENT',
        pcs: 1,
        hsn: '7113',
        purity: '22',
        grossWeight: 1,
        netWeight: 1,
        ratePerGm: 100,
        value: 100,
        diamondCts: 0,
        diamondAmount: 0,
        makingCharge: 0,
        hallmarkCharge: 0,
        totalAmount: 100,
      },
    ]);
  };

  const handleRemoveItem = (index) => {
    if (items.length <= 1) {
      alert('At least one item line must remain on bill.');
      return;
    }
    setIsInvoiceSaved(false);
    setItems(items.filter((_, i) => i !== index));
  };

  // Save Invoice Handler (Locks calculations and enables Print button)
  const handleSaveInvoice = () => {
    setIsInvoiceSaved(true);
  };

  const triggerPrintWindow = () => {
    window.print();
  };

  return (
    <div className="billing-workspace space-y-6">
      
      {/* ------------------------------------------------------------- */}
      {/* Top Action Bar with Save & Generate/Print Buttons */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div>
          <p className="text-xs text-slate-500 mt-1">
            Rajmoni Jewellers - Every field manually editable for client demo. Click "Save Invoice" to enable printing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* 1. Save Invoice Button */}
          <button
            type="button"
            onClick={handleSaveInvoice}
            className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold shadow-md transition ${
              isInvoiceSaved
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-amber-500 text-slate-950 hover:bg-amber-400 animate-pulse'
            }`}
          >
            <span>{isInvoiceSaved ? '✅ Invoice Saved' : '💾 Save Invoice'}</span>
          </button>

          {/* 2. Generate & Print Bill Button (Enabled ONLY after Save Invoice is clicked) */}
          {isInvoiceSaved ? (
            <button
              type="button"
              onClick={() => setIsPreviewModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-xs font-bold text-amber-400 shadow-md hover:bg-slate-800 transition"
            >
              <span>🧾 Generate & Print Bill</span>
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex items-center gap-2 rounded-lg bg-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-400 cursor-not-allowed border border-slate-300"
              title="Please click Save Invoice first to enable Bill Printing"
            >
              <span>🔒 Save Invoice First to Print</span>
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Sales Entry Workspace (Clean Input Form & Table) */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-6">
        
        {/* Section A: Shop Contact Metadata */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            Shop Details & Credentials
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Phone Numbers</label>
              <input
                type="text"
                value={shopPhone}
                onChange={(e) => { setIsInvoiceSaved(false); setShopPhone(e.target.value); }}
                className="w-full rounded border border-slate-300 p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Shop Email</label>
              <input
                type="text"
                value={shopEmail}
                onChange={(e) => { setIsInvoiceSaved(false); setShopEmail(e.target.value); }}
                className="w-full rounded border border-slate-300 p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Shop GSTIN</label>
              <input
                type="text"
                value={shopGstin}
                onChange={(e) => { setIsInvoiceSaved(false); setShopGstin(e.target.value); }}
                className="w-full rounded border border-slate-300 p-2 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section B: Sales & Receiver Details */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          
          {/* Invoice Meta */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Invoice Details
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600">Sales Person</label>
                <input
                  type="text"
                  value={salesPerson}
                  onChange={(e) => { setIsInvoiceSaved(false); setSalesPerson(e.target.value); }}
                  className="w-full rounded border border-slate-300 p-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600">Invoice No</label>
                <input
                  type="text"
                  value={invoiceNo}
                  onChange={(e) => { setIsInvoiceSaved(false); setInvoiceNo(e.target.value); }}
                  className="w-full rounded border border-slate-300 p-2 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600">Order No</label>
                <input
                  type="text"
                  value={orderNo}
                  onChange={(e) => { setIsInvoiceSaved(false); setOrderNo(e.target.value); }}
                  placeholder="Optional"
                  className="w-full rounded border border-slate-300 p-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600">Date</label>
                <input
                  type="text"
                  value={invoiceDate}
                  onChange={(e) => { setIsInvoiceSaved(false); setInvoiceDate(e.target.value); }}
                  className="w-full rounded border border-slate-300 p-2 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Billed To Customer */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Customer Details (Billed To)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600">Customer Name</label>
                <input
                  type="text"
                  value={receiver.name}
                  onChange={(e) => { setIsInvoiceSaved(false); setReceiver({ ...receiver, name: e.target.value }); }}
                  className="w-full rounded border border-slate-300 p-2 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600">Contact No</label>
                <input
                  type="text"
                  value={receiver.contact}
                  onChange={(e) => { setIsInvoiceSaved(false); setReceiver({ ...receiver, contact: e.target.value }); }}
                  className="w-full rounded border border-slate-300 p-2 text-xs"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[11px] font-semibold text-slate-600">Address</label>
                <input
                  type="text"
                  value={receiver.address}
                  onChange={(e) => { setIsInvoiceSaved(false); setReceiver({ ...receiver, address: e.target.value }); }}
                  className="w-full rounded border border-slate-300 p-2 text-xs"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Section C: Items Entry Table (ALL COLUMNS MANUALLY EDITABLE) */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Sale Items List (Demo Mode - All Columns Manually Editable)
              </h3>
              <p className="text-[11px] text-slate-500">
                Every field is editable for client demo. Rate entered directly drives Total Amount (e.g. Rate 100 &rarr; Total Amount 100).
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddItem}
              className="rounded bg-amber-500 px-3 py-1 text-xs font-bold text-slate-950 hover:bg-amber-400"
            >
              + Add Item Row
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 font-bold text-slate-700">
                <tr>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border w-14">Pcs</th>
                  <th className="p-2 border w-16">HSN</th>
                  <th className="p-2 border w-16">Purity</th>
                  <th className="p-2 border w-20">Gross Wt</th>
                  <th className="p-2 border w-24">Net Wt</th>
                  <th className="p-2 border w-28 bg-amber-100 text-amber-900">Rate (Active Calculation)</th>
                  <th className="p-2 border w-24">Making Chg</th>
                  <th className="p-2 border w-20">Hallmark</th>
                  <th className="p-2 border w-28">Total Amount</th>
                  <th className="p-2 border w-12 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={item.id} className="border-b">
                    {/* Description (Editable) */}
                    <td className="p-1 border">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                        className="w-full p-1 border rounded bg-white text-slate-800"
                      />
                    </td>
                    {/* Pcs (Editable) */}
                    <td className="p-1 border">
                      <input
                        type="number"
                        min="1"
                        value={item.pcs}
                        onChange={(e) => handleItemChange(idx, 'pcs', e.target.value)}
                        className="w-full p-1 border rounded bg-white text-slate-800"
                      />
                    </td>
                    {/* HSN (Editable) */}
                    <td className="p-1 border">
                      <input
                        type="text"
                        value={item.hsn}
                        onChange={(e) => handleItemChange(idx, 'hsn', e.target.value)}
                        className="w-full p-1 border rounded bg-white text-slate-800"
                      />
                    </td>
                    {/* Purity (Editable) */}
                    <td className="p-1 border">
                      <input
                        type="text"
                        value={item.purity}
                        onChange={(e) => handleItemChange(idx, 'purity', e.target.value)}
                        className="w-full p-1 border rounded bg-white text-slate-800"
                      />
                    </td>
                    {/* Gross Wt (Editable) */}
                    <td className="p-1 border">
                      <input
                        type="number"
                        step="0.001"
                        value={item.grossWeight}
                        onChange={(e) => handleItemChange(idx, 'grossWeight', e.target.value)}
                        className="w-full p-1 border rounded bg-white text-slate-800"
                      />
                    </td>
                    {/* Net Wt (Editable) */}
                    <td className="p-1 border">
                      <input
                        type="number"
                        step="0.001"
                        value={item.netWeight}
                        onChange={(e) => handleItemChange(idx, 'netWeight', e.target.value)}
                        className="w-full p-1 border rounded bg-white text-slate-800"
                      />
                    </td>
                    {/* Rate (ACTIVE PRICE COLUMN - DRIVES TOTAL) */}
                    <td className="p-1 border bg-amber-50">
                      <input
                        type="number"
                        value={item.ratePerGm}
                        onChange={(e) => handleItemChange(idx, 'ratePerGm', e.target.value)}
                        className="w-full p-1 border-2 border-amber-500 rounded font-bold text-amber-900 bg-white"
                        placeholder="Enter Rate (e.g. 100)"
                      />
                    </td>
                    {/* Making Chg (Editable) */}
                    <td className="p-1 border">
                      <input
                        type="number"
                        value={item.makingCharge}
                        onChange={(e) => handleItemChange(idx, 'makingCharge', e.target.value)}
                        className="w-full p-1 border rounded bg-white text-slate-800"
                      />
                    </td>
                    {/* Hallmark (Editable) */}
                    <td className="p-1 border">
                      <input
                        type="number"
                        value={item.hallmarkCharge}
                        onChange={(e) => handleItemChange(idx, 'hallmarkCharge', e.target.value)}
                        className="w-full p-1 border rounded bg-white text-slate-800"
                      />
                    </td>
                    {/* Total Amount (Auto = Rate entered) */}
                    <td className="p-1 border font-bold text-slate-900 bg-emerald-50/50">
                      ₹{item.totalAmount}
                    </td>
                    <td className="p-1 border text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="text-rose-600 font-bold hover:bg-rose-50 px-2 py-0.5 rounded"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section D: Payment Mode & Financial Adjustments */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            Payment Mode & Financial Summary
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Payment Mode</label>
              <select
                value={paymentMode}
                onChange={(e) => { setIsInvoiceSaved(false); setPaymentMode(e.target.value); }}
                className="w-full rounded border border-slate-300 p-2 text-xs font-bold"
              >
                <option value="CASH">CASH</option>
                <option value="UPI / ONLINE">UPI / ONLINE</option>
                <option value="CARD">CARD</option>
                <option value="BANK TRANSFER">BANK TRANSFER</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Discount (₹)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => { setIsInvoiceSaved(false); setDiscount(e.target.value); }}
                className="w-full rounded border border-slate-300 p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Amount Received (₹)</label>
              <input
                type="number"
                value={amountReceived}
                onChange={(e) => { setIsInvoiceSaved(false); setAmountReceived(e.target.value); }}
                className="w-full rounded border border-slate-300 p-2 text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Advance Payment (₹)</label>
              <input
                type="number"
                value={advancePayment}
                onChange={(e) => { setIsInvoiceSaved(false); setAdvancePayment(e.target.value); }}
                className="w-full rounded border border-slate-300 p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Old Gold Exchange (₹)</label>
              <input
                type="number"
                value={oldGoldAmount}
                onChange={(e) => { setIsInvoiceSaved(false); setOldGoldAmount(e.target.value); }}
                className="w-full rounded border border-slate-300 p-2 text-xs"
              />
            </div>
          </div>

          {/* Static 3% GST Summary Strip */}
          <div className="mt-4 flex flex-wrap items-center justify-between border-t border-slate-100 pt-3 text-xs font-bold text-slate-800">
            <div>
              Taxable: ₹{taxableAmount} | <span className="text-blue-700">SGST (1.5%): ₹{sgstAmount}</span> | <span className="text-blue-700">CGST (1.5%): ₹{cgstAmount}</span> | <span className="text-amber-800">Static GST (3% Total): ₹{totalGstAmount}</span>
            </div>
            <div className="text-base font-black text-amber-600">Grand Total: ₹{grandTotal}</div>
          </div>
        </div>

        {/* Save & Generate Buttons Footer Bar */}
        <div className="flex items-center justify-between pt-2">
          <div>
            {!isInvoiceSaved && (
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                ⚠️ Click "Save Invoice" first to lock calculations and enable bill printing.
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Save Button */}
            <button
              type="button"
              onClick={handleSaveInvoice}
              className={`inline-flex items-center gap-2 rounded-lg px-6 py-3 text-xs font-extrabold shadow-md transition ${
                isInvoiceSaved
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-amber-500 text-slate-950 hover:bg-amber-400 animate-pulse'
              }`}
            >
              <span>{isInvoiceSaved ? '✅ Invoice Saved' : '💾 Save Invoice'}</span>
            </button>

            {/* Generate & Print Bill Button (Enabled ONLY when Saved) */}
            {isInvoiceSaved ? (
              <button
                type="button"
                onClick={() => setIsPreviewModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-xs font-extrabold text-amber-400 shadow-md hover:bg-slate-800 transition"
              >
                <span>🧾 Generate & Print Bill</span>
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 rounded-lg bg-slate-200 px-5 py-3 text-xs font-semibold text-slate-400 cursor-not-allowed border border-slate-300"
              >
                <span>🔒 Save Invoice First</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* Modal Dialog for Bill Print Preview */}
      {/* ------------------------------------------------------------- */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          
          {/* Modal Container */}
          <div className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-xl bg-white shadow-2xl overflow-hidden">
            
            {/* Modal Header Bar */}
            <div className="no-print flex items-center justify-between border-b border-slate-200 bg-slate-900 px-6 py-3 text-white">
              <div className="flex items-center space-x-2">
                <span>🧾</span>
                <span className="font-bold text-sm">Rajmoni Jewellers - GST Invoice Preview</span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={triggerPrintWindow}
                  className="rounded bg-amber-500 px-4 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-400 shadow transition"
                >
                  🖨️ Print Now
                </button>
                <button
                  type="button"
                  onClick={() => setIsPreviewModalOpen(false)}
                  className="rounded p-1 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Printable Sheet View Body */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-100">
              <div id="printable-invoice" className="print-invoice-sheet text-xs shadow-md">
                
                {/* Top Right Header Copy Mark */}
                <div className="text-right text-[10px] italic">
                  Original for Buyer
                </div>

                {/* Shop Name & Header */}
                <div className="text-center">
                  <h1 className="text-2xl font-black tracking-wider uppercase text-slate-900 border-b border-transparent">
                    RAJMONI JEWELLERS
                  </h1>
                  <p className="text-[11px] font-semibold mt-0.5">
                    74/3 SODPURE ROAD EAST
                  </p>
                  <p className="text-[11px] font-semibold">
                    MADHAMGRAM, KOLKATA-700129
                  </p>
                  <p className="text-[10px] mt-1">
                    Phone : {shopPhone} &nbsp; E-Mail : {shopEmail}
                  </p>
                  <p className="text-[10px] font-bold">
                    GSTIN : {shopGstin}
                  </p>
                  <div className="mt-1 font-bold tracking-widest text-sm uppercase underline decoration-1">
                    GST INVOICE
                  </div>
                </div>

                {/* Invoice Header Meta Table */}
                <div className="mt-3 border border-black grid grid-cols-2 text-[11px]">
                  <div className="p-1.5 border-r border-black space-y-0.5">
                    <div><span className="font-bold">SALES PERSON:</span> {salesPerson}</div>
                    <div className="grid grid-cols-2">
                      <div><span className="font-bold">ORDER NO :</span> {orderNo}</div>
                      <div><span className="font-bold">INVOICE NO :</span> {invoiceNo}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div><span className="font-bold">ORDER DATE :</span> {orderDate}</div>
                      <div><span className="font-bold">DATE :</span> {invoiceDate}</div>
                    </div>
                  </div>
                  <div className="p-1.5 space-y-0.5">
                    {/* Right side placeholder box matching exact bill header */}
                  </div>
                </div>

                {/* Receiver & Consignee Side-by-Side Box */}
                <div className="border-x border-b border-black grid grid-cols-2 text-[10px]">
                  {/* Receiver */}
                  <div className="p-1.5 border-r border-black">
                    <div className="font-bold underline mb-0.5">Details of Receiver (Billed To) :</div>
                    <div className="font-bold">{receiver.name}</div>
                    <div>ADD: {receiver.address}</div>
                    <div>ADD: State : {receiver.state}</div>
                    <div>CONTACT NO : {receiver.contact}</div>
                    <div>GST NO.: {receiver.gstNo} PAN NO: {receiver.panNo}</div>
                    <div className="font-semibold">({receiver.stateCode})</div>
                  </div>

                  {/* Consignee */}
                  <div className="p-1.5">
                    <div className="font-bold underline mb-0.5">Details of Consignee (Shipped To) :</div>
                    <div className="font-bold">{consigneeSameAsReceiver ? receiver.name : consignee.name}</div>
                    <div>ADD: {consigneeSameAsReceiver ? receiver.address : consignee.address}</div>
                    <div>ADD: State : {consigneeSameAsReceiver ? receiver.state : consignee.state}</div>
                    <div>CONTACT NO : {consigneeSameAsReceiver ? receiver.contact : consignee.contact}</div>
                    <div>GST NO.: {consigneeSameAsReceiver ? receiver.gstNo : consignee.gstNo} PAN NO: {consigneeSameAsReceiver ? receiver.panNo : consignee.panNo}</div>
                    <div className="font-semibold">({consigneeSameAsReceiver ? receiver.stateCode : consignee.stateCode})</div>
                  </div>
                </div>

                {/* Main Items Grid Table */}
                <table className="invoice-table-grid mt-[-1px]">
                  <thead>
                    <tr>
                      <th rowSpan="2" className="w-8">SL NO</th>
                      <th rowSpan="2">DESCRIPTION</th>
                      <th rowSpan="2" className="w-10">PCS</th>
                      <th rowSpan="2" className="w-12">HSN</th>
                      <th colSpan="5">GOLD / SILVER</th>
                      <th colSpan="2">DIAMOND/STONE</th>
                      <th colSpan="2">OTHERS</th>
                      <th rowSpan="2" className="w-24">TOTAL AMOUNT</th>
                    </tr>
                    <tr>
                      <th className="w-10">PURITY</th>
                      <th className="w-12">Gross Weight</th>
                      <th className="w-12">Net Weight</th>
                      <th className="w-16">RATE /GM</th>
                      <th className="w-16">VALUE</th>
                      <th className="w-12">Weight Cts</th>
                      <th className="w-14">Amount Rs</th>
                      <th className="w-12">Making Chg</th>
                      <th className="w-12">Hallmark Chg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, i) => (
                      <tr key={item.id} className="text-center">
                        <td>{i + 1}</td>
                        <td className="text-left font-bold">{item.description}</td>
                        <td>{item.pcs}</td>
                        <td>{item.hsn}</td>
                        <td>{item.purity}</td>
                        <td>{Number(item.grossWeight).toFixed(3)}</td>
                        <td>{Number(item.netWeight).toFixed(3)}</td>
                        <td>{item.ratePerGm}/gm</td>
                        <td>{item.value ? Number(item.value).toFixed(2) : '0.00'}</td>
                        <td>{Number(item.diamondCts).toFixed(2)}</td>
                        <td>{Number(item.diamondAmount).toFixed(2)}</td>
                        <td>{item.makingCharge}</td>
                        <td>{item.hallmarkCharge}</td>
                        <td className="text-right font-bold">{Number(item.totalAmount).toFixed(2)}</td>
                      </tr>
                    ))}

                    {/* Empty filler rows to maintain clean paper height */}
                    {Array.from({ length: Math.max(0, 4 - items.length) }).map((_, fillIdx) => (
                      <tr key={`fill-${fillIdx}`} className="h-6">
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                      </tr>
                    ))}

                    {/* Total Row */}
                    <tr className="font-bold bg-slate-50 text-center">
                      <td colSpan="2" className="text-left">TOTAL</td>
                      <td>PCS: {totalPcs}</td>
                      <td>&nbsp;</td>
                      <td>&nbsp;</td>
                      <td>{totalGrossWeight.toFixed(3)}</td>
                      <td>{totalNetWeight.toFixed(3)}</td>
                      <td>0.00</td>
                      <td>{totalValue.toFixed(0)}</td>
                      <td>{totalDiamondCts.toFixed(2)}</td>
                      <td>{totalDiamondAmount.toFixed(0)}</td>
                      <td>{totalMakingCharge}</td>
                      <td>{totalHallmarkCharge}</td>
                      <td className="text-right">{itemsSubtotal.toFixed(0)}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Amount in Words & Payment Mode Row */}
                <div className="border-x border-b border-black grid grid-cols-12 text-[10px]">
                  <div className="col-span-8 p-1.5 border-r border-black space-y-1">
                    <div className="font-bold italic">
                      {amountInWords}
                    </div>
                    <div className="flex items-center gap-4 pt-1 font-bold">
                      <span>MODE OF PAYMENT:</span>
                      <span className="uppercase">{paymentMode}</span>
                      <span className="ml-auto">{amountReceived.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="col-span-4 p-1.5 text-right space-y-0.5 font-bold">
                    <div className="flex justify-between">
                      <span>DISCOUNT</span>
                      <span>{discount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-300 pt-0.5">
                      <span>TAXABLE AMOUNT</span>
                      <span>{taxableAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[9px] font-normal">
                      <span>SGST 1.50%</span>
                      <span>{sgstAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[9px] font-normal">
                      <span>CGST 1.50%</span>
                      <span>{cgstAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-300 pt-0.5 font-bold">
                      <span>STATIC GST 3.00%</span>
                      <span>{totalGstAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Calculations Footer & Terms Grid */}
                <div className="border-x border-b border-black grid grid-cols-12 text-[10px]">
                  
                  {/* Terms & Conditions */}
                  <div className="col-span-7 p-1.5 border-r border-black text-[9px] leading-tight space-y-0.5">
                    <div className="font-bold underline mb-0.5">Terms & Conditions</div>
                    <ol className="list-decimal list-inside space-y-0.5">
                      <li>In Case of jewellery order minimum 30% amount must be deposited to be Fixed on that day.</li>
                      <li>If the order jewellery is not taken within Three months, the price will change.</li>
                      <li>8.5% will be deducted for Gold jewellery sale and the bill must be Broght Along.</li>
                      <li>Goods are Forwarded at Consignee Risk Only.</li>
                      <li>Goods ones sold can not taken back or return.sold item exchanged in maximum 3 days only.</li>
                      <li>Whether gold was required to be declared under section 16 and it has been included in a declaration.</li>
                    </ol>
                  </div>

                  {/* Amount Breakdown */}
                  <div className="col-span-5 p-1.5 font-bold space-y-1">
                    <div className="flex justify-between">
                      <span>AMOUNT RECEIVED</span>
                      <span>{amountReceived.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>ADVANCE PAYMENT</span>
                      <span>{advancePayment}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>OLD GOLD AMOUNT</span>
                      <span>{oldGoldAmount}</span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>BALANCE AMOUNT</span>
                      <span>{balanceAmount}</span>
                    </div>
                    <div className="flex justify-between border-t border-black pt-1 text-xs font-black text-slate-900">
                      <span>GRAND TOTAL</span>
                      <span>{grandTotal.toFixed(0)}</span>
                    </div>
                  </div>

                </div>

                {/* Signatures Area */}
                <div className="border-x border-b border-black grid grid-cols-2 p-4 pt-8 text-[10px] font-bold">
                  <div>
                    <div className="border-t border-dashed border-slate-400 w-36 pt-1 text-center">
                      CUSTOMER'S SIGNATURE
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end">
                    <div className="mb-6 font-bold">FOR RAJMONI JEWELLERS</div>
                    <div className="border-t border-dashed border-slate-400 w-44 pt-1 text-center">
                      AUTHORISED SIGNATORY.
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="no-print flex justify-end gap-3 border-t border-slate-200 bg-white p-4">
              <button
                type="button"
                onClick={() => setIsPreviewModalOpen(false)}
                className="rounded border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                Close Preview
              </button>
              <button
                type="button"
                onClick={triggerPrintWindow}
                className="rounded bg-amber-500 px-5 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400 shadow"
              >
                🖨️ Print Now
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
