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
    1: 0.032,
    2: 0.062,
    3: 0.078,
    4: 0.096,
    5: 0.114,
    6: 0.130,
    7: 0.149,
    8: 0.167,
    9: 0.185,
    10: 0.2045,
    11: 0.2240,
    12: 0.2399
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
        taksitTutari: taksitTutari.toFixed(2),
        cekilecekTutar: cekilecekTutar.toFixed(2)
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
        taksitTutari: taksitTutari.toFixed(2),
        gecenTutar: gecenTutar.toFixed(2)
      });
    }
    
    setCekimHesaplamalar(yeniHesaplamalar);
  };

  return <Tabs aria-label="Hesaplamalar">
    <Tab key="tab1"  title="Geçecekten Hesaplama">
        <Input 
          variant="underlined" 
          label="Hesaba geçmesi gereken tutar" 
          value={tutar}
          onChange={(e) => setTutar(e.target.value)}
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
        label="Çekilecek tutar" 
        value={cekimTutar}
        onChange={(e) => setCekimTutar(e.target.value)}
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
        <TableBody>
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
