"use client"
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@heroui/table";
  import {Tabs, Tab} from "@heroui/tabs";
  import {Input} from "@heroui/input";
  import {Button} from "@heroui/button";
import { useState } from "react";

export default function MyTable() {
  const [tutar, setTutar] = useState("");
  const [hesaplamalar, setHesaplamalar] = useState([]);
  const [cekimTutar, setCekimTutar] = useState("");
  const [cekimHesaplamalar, setCekimHesaplamalar] = useState([]);

  const oranlar = {
    1: 0.035,
    2: 0.073,
    3: 0.090,
    4: 0.1075,
    5: 0.126,
    6: 0.1425,
    7: 0.165,
    8: 0.180,
    9: 0.1950,
    10: 0.2180,
    11: 0.2370,
    12: 0.26
  };

  const hesapla = () => {
    if (!tutar || isNaN(parseFloat(tutar))) return;
    
    const tutarSayi = parseFloat(tutar);
    const yeniHesaplamalar = [];
    
    for (let taksit = 1; taksit <= 12; taksit++) {
      const oran = oranlar[taksit];
      const cekilecekTutar = tutarSayi / (1 - oran);
      const taksitTutari = taksit === 1 ? cekilecekTutar : cekilecekTutar / taksit;
      
      yeniHesaplamalar.push({
        taksit,
        taksitTutari: formatTurkishCurrency(taksitTutari),
        cekilecekTutar: formatTurkishCurrency(cekilecekTutar)
      });
    }
    
    setHesaplamalar(yeniHesaplamalar);
  };

  const cekimdenHesapla = () => {
    if (!cekimTutar || isNaN(parseFloat(cekimTutar))) return;
    
    const tutarSayi = parseFloat(cekimTutar);
    const yeniHesaplamalar = [];
    
    for (let taksit = 1; taksit <= 12; taksit++) {
      const oran = oranlar[taksit];
      const gecenTutar = tutarSayi * (1 - oran);
      const taksitTutari = taksit === 1 ? tutarSayi : tutarSayi / taksit;
      
      yeniHesaplamalar.push({
        taksit,
        taksitTutari: formatTurkishCurrency(taksitTutari),
        gecenTutar: formatTurkishCurrency(gecenTutar)
      });
    }
    
    setCekimHesaplamalar(yeniHesaplamalar);
  };

  const handleTutarChange = (e) => {
    const value = e.target.value.replace(/\./g, '').replace(',', '.');
    setTutar(value);
  };

  const handleCekimTutarChange = (e) => {
    const value = e.target.value.replace(/\./g, '').replace(',', '.');
    setCekimTutar(value);
  };

  const formatInputValue = (value) => {
    if (!value) return "";
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;
    return numValue.toLocaleString('tr-TR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  };

  // Türk para birimi formatı için yardımcı fonksiyon
  const formatTurkishCurrency = (value) => {
    return value.toLocaleString('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return <Tabs aria-label="Hesaplamalar">
    <Tab key="tab1"  title="Geçecekten Hesaplama">
        <Input 
          variant="underlined" 
          label="Hesaba Geçmesi Gereken Tutar" 
          value={formatInputValue(tutar)}
          onChange={handleTutarChange}
        />
        <div className="flex justify-end mt-2 mb-2">
        <Button variant="bordered" color="primary" className="" onPress={hesapla}>Hesapla</Button>
        </div>
        <Table>
            <TableHeader>
                <TableColumn>
                    Taksit
                </TableColumn>
                <TableColumn>
                    Taksit Tutarı
                </TableColumn>
                <TableColumn>
                    Çekilecek Tutar
                </TableColumn>
            </TableHeader>
            <TableBody emptyContent="Önce tutar yazmalısınız">
                {hesaplamalar.length > 0 && (
                  hesaplamalar.map((item) => (
                    <TableRow key={item.taksit}>
                      <TableCell>{item.taksit}</TableCell>
                      <TableCell>{item.taksitTutari} TL</TableCell>
                      <TableCell>{item.cekilecekTutar} TL</TableCell>
                    </TableRow>
                  ))
                )}
            </TableBody>
        </Table>
    </Tab>
    <Tab key="tab2" title="Çekimden Hesaplama">
      <Input 
        variant="underlined" 
        label="Karttan Çekilecek Tutar" 
        value={formatInputValue(cekimTutar)}
        onChange={handleCekimTutarChange}
      />
      <div className="flex justify-end mt-2 mb-2">
        <Button variant="bordered" color="primary" className="" onPress={cekimdenHesapla}>Hesapla</Button>
      </div>
      <Table>
        <TableHeader>
          <TableColumn>
            Taksit
          </TableColumn>
          <TableColumn>
            Taksit Tutarı
          </TableColumn>
          <TableColumn>
            Hesaba Geçen Tutar
          </TableColumn>
        </TableHeader>
        <TableBody emptyContent="Önce tutar yazmalısınız">
          {cekimHesaplamalar.length > 0 && (
            cekimHesaplamalar.map((item) => (
              <TableRow key={item.taksit}>
                <TableCell>{item.taksit}</TableCell>
                <TableCell>{item.taksitTutari} TL</TableCell>
                <TableCell>{item.gecenTutar} TL</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Tab>
  </Tabs>
}
