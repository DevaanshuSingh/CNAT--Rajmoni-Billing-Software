import React, { useState } from 'react';
import { numberToWordsIndian } from '../../utils/numberToWords';
import './Billing.css';

/**
 * Billing Page Component
 * 
 * Interactive Sales Entry & Authentic Bill Printing Generator for Rajmoni Jewellers.
 * Matches the exact paper invoice format used by Rajmoni Jewellers.
 */
export default function Billing() {
  // ------------------------------------------------------------------
  // 1. Shop Header Info (Configurable)
  // ------------------------------------------------------------------
  const [shopPhone, setShopPhone] = useState('9830000000 / 9831000000');
  const [shopCalling, setShopCalling] = useState('9830000000');
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
  // 3. Customer (Receiver & Consignee) Details State
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
  // 4. Line Items State (Default item loaded from sample bill image)
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
      ratePerGm: 13590,
      value: 92140.2, // netWeight * ratePerGm
      diamondCts: 0,
      diamondAmount: 0,
      makingCharge: 8293,
      hallmarkCharge: 55,
      totalAmount: 100487.82,
    },
  ]);

  // ------------------------------------------------------------------
  // 5. Payment & Additional Calculation State
  // ------------------------------------------------------------------
  const [paymentMode, setPaymentMode] = useState('CASH');
  const [discount, setDiscount] = useState(2.0);
  const [amountReceived, setAmountReceived] = useState(103500);
  const [advancePayment, setAdvancePayment] = useState(0);
  const [oldGoldAmount, setOldGoldAmount] = useState(0);

  // ------------------------------------------------------------------
  // Calculations
  // ------------------------------------------------------------------
  const totalPcs = items.reduce((sum, item) => sum + (Number(item.pcs) || 0), 0);
  const totalGrossWeight = items.reduce((sum, item) => sum + (Number(item.grossWeight) || 0), 0);
  const totalNetWeight = items.reduce((sum, item) => sum + (Number(item.netWeight) || 0), 0);
  const totalValue = items.reduce((sum, item) => sum + (Number(item.value) || 0), 0);
  const totalDiamondCts = items.reduce((sum, item) => sum + (Number(item.diamondCts) || 0), 0);
  const totalDiamondAmount = items.reduce((sum, item) => sum + (Number(item.diamondAmount) || 0), 0);
  const totalMakingCharge = items.reduce((sum, item) => sum + (Number(item.makingCharge) || 0), 0);
  const totalHallmarkCharge = items.reduce((sum, item) => sum + (Number(item.hallmarkCharge) || 0), 0);
  const itemsSubtotal = items.reduce((sum, item) => sum + (Number(item.totalAmount) || 0), 0);

  // Financial summary
  const taxableAmount = Math.max(0, itemsSubtotal - (Number(discount) || 0));
  const sgstAmount = Number((taxableAmount * 0.015).toFixed(2)); // SGST 1.50%
  const cgstAmount = Number((taxableAmount * 0.015).toFixed(2)); // CGST 1.50%
  const grandTotal = Math.round(taxableAmount + sgstAmount + cgstAmount);

  const balanceAmount =
    grandTotal -
    (Number(amountReceived) || 0) -
    (Number(advancePayment) || 0) -
    (Number(oldGoldAmount) || 0);

  const amountInWords = numberToWordsIndian(grandTotal);

  // ------------------------------------------------------------------
  // Handlers
  // ------------------------------------------------------------------
  const handleItemChange = (index, field, val) => {
    const updated = [...items];
    const item = { ...updated[index], [field]: val };

    // Auto calculate Item Value = netWeight * ratePerGm
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

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        description: 'GOLD ORNAMENT',
        pcs: 1,
        hsn: '7113',
        purity: '22',
        grossWeight: 0,
        netWeight: 0,
        ratePerGm: 0,
        value: 0,
        diamondCts: 0,
        diamondAmount: 0,
        makingCharge: 0,
        hallmarkCharge: 0,
        totalAmount: 0,
      },
    ]);
  };

  const handleRemoveItem = (index) => {
    if (items.length <= 1) {
      alert('At least one item line must remain on bill.');
      return;
    }
    setItems(items.filter((_, i) => i !== index));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="billing-workspace space-y-6">
      
      {/* ------------------------------------------------------------- */}
      {/* Top Action Bar (No Print) */}
      {/* ------------------------------------------------------------- */}
      <div className="no-print flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Sales Billing & GST Invoice Generator
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Rajmoni Jewellers authentic sale invoice format (Madhyamgram, Kolkata)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-md hover:bg-amber-400 focus:outline-none transition"
          >
            <span>🖨️ Print GST Invoice</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* Interactive Form Controls Workspace (No Print) */}
      {/* ------------------------------------------------------------- */}
      <div className="no-print space-y-6">
        
        {/* Section A: Hidden / Editable Shop Details */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            Shop Details & Hidden Contact Info
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Phone Numbers</label>
              <input
                type="text"
                value={shopPhone}
                onChange={(e) => setShopPhone(e.target.value)}
                className="w-full rounded border border-slate-300 p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Calling Number (Footer)</label>
              <input
                type="text"
                value={shopCalling}
                onChange={(e) => setShopCalling(e.target.value)}
                className="w-full rounded border border-slate-300 p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Shop Email</label>
              <input
                type="text"
                value={shopEmail}
                onChange={(e) => setShopEmail(e.target.value)}
                className="w-full rounded border border-slate-300 p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Shop GSTIN</label>
              <input
                type="text"
                value={shopGstin}
                onChange={(e) => setShopGstin(e.target.value)}
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
              Invoice Meta Details
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600">Sales Person</label>
                <input
                  type="text"
                  value={salesPerson}
                  onChange={(e) => setSalesPerson(e.target.value)}
                  className="w-full rounded border border-slate-300 p-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600">Invoice No</label>
                <input
                  type="text"
                  value={invoiceNo}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                  className="w-full rounded border border-slate-300 p-2 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600">Order No</label>
                <input
                  type="text"
                  value={orderNo}
                  onChange={(e) => setOrderNo(e.target.value)}
                  placeholder="Optional"
                  className="w-full rounded border border-slate-300 p-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600">Date</label>
                <input
                  type="text"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full rounded border border-slate-300 p-2 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Billed To Customer */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Details of Receiver (Billed To)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600">Customer Name</label>
                <input
                  type="text"
                  value={receiver.name}
                  onChange={(e) => setReceiver({ ...receiver, name: e.target.value })}
                  className="w-full rounded border border-slate-300 p-2 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600">Contact No</label>
                <input
                  type="text"
                  value={receiver.contact}
                  onChange={(e) => setReceiver({ ...receiver, contact: e.target.value })}
                  className="w-full rounded border border-slate-300 p-2 text-xs"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[11px] font-semibold text-slate-600">Address</label>
                <input
                  type="text"
                  value={receiver.address}
                  onChange={(e) => setReceiver({ ...receiver, address: e.target.value })}
                  className="w-full rounded border border-slate-300 p-2 text-xs"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Section C: Items Entry Table */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Jewelry Sales Line Items
            </h3>
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
                  <th className="p-2 border w-20">Net Wt</th>
                  <th className="p-2 border w-24">Rate /GM</th>
                  <th className="p-2 border w-24">Making Chg</th>
                  <th className="p-2 border w-20">Hallmark</th>
                  <th className="p-2 border w-28">Total Amount</th>
                  <th className="p-2 border w-12 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-1 border">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-1 border">
                      <input
                        type="number"
                        min="1"
                        value={item.pcs}
                        onChange={(e) => handleItemChange(idx, 'pcs', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-1 border">
                      <input
                        type="text"
                        value={item.hsn}
                        onChange={(e) => handleItemChange(idx, 'hsn', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-1 border">
                      <input
                        type="text"
                        value={item.purity}
                        onChange={(e) => handleItemChange(idx, 'purity', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-1 border">
                      <input
                        type="number"
                        step="0.001"
                        value={item.grossWeight}
                        onChange={(e) => handleItemChange(idx, 'grossWeight', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-1 border">
                      <input
                        type="number"
                        step="0.001"
                        value={item.netWeight}
                        onChange={(e) => handleItemChange(idx, 'netWeight', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-1 border">
                      <input
                        type="number"
                        value={item.ratePerGm}
                        onChange={(e) => handleItemChange(idx, 'ratePerGm', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-1 border">
                      <input
                        type="number"
                        value={item.makingCharge}
                        onChange={(e) => handleItemChange(idx, 'makingCharge', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-1 border">
                      <input
                        type="number"
                        value={item.hallmarkCharge}
                        onChange={(e) => handleItemChange(idx, 'hallmarkCharge', e.target.value)}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                    <td className="p-1 border font-bold text-slate-900">
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

        {/* Section D: Additional Financial Adjustments */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            Payment Mode & Adjustments
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Payment Mode</label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
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
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full rounded border border-slate-300 p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Amount Received (₹)</label>
              <input
                type="number"
                value={amountReceived}
                onChange={(e) => setAmountReceived(e.target.value)}
                className="w-full rounded border border-slate-300 p-2 text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Advance Payment (₹)</label>
              <input
                type="number"
                value={advancePayment}
                onChange={(e) => setAdvancePayment(e.target.value)}
                className="w-full rounded border border-slate-300 p-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600">Old Gold Exchange (₹)</label>
              <input
                type="number"
                value={oldGoldAmount}
                onChange={(e) => setOldGoldAmount(e.target.value)}
                className="w-full rounded border border-slate-300 p-2 text-xs"
              />
            </div>
          </div>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. Authentic Printable Invoice (Exact replica of customer paper bill) */}
      {/* ------------------------------------------------------------- */}
      <div id="printable-invoice" className="print-invoice-sheet text-xs">
        
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
            {/* Right side empty placeholder box matching exact bill header */}
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
          </div>
        </div>

        {/* Calculations Footer & Terms Grid */}
        <div className="border-x border-b border-black grid grid-cols-12 text-[10px]">
          
          {/* Terms & Conditions (Exact text from authentic bill) */}
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

        {/* Footer Attribution Line */}
        <div className="mt-1 text-[8px] text-slate-600 text-center flex justify-between">
          <span>MARG ERP NANO Rs.5550 | Manage Stock, Accounts, GST, Barcodeing</span>
          <span>Call : {shopCalling}</span>
        </div>

      </div>

    </div>
  );
}
