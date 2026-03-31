# ERC20 Token Ecosystem: Logic & Fundamentals

Bu proje, bir Blockchain Geliştiricisi (Smart Contract Developer) olma yolunda attığım temel adımları ve akıllı kontratların arkasındaki ana mantığı anlamak için geliştirdiğim çalışmaları içermektedir. 

Hazır kütüphaneleri kullanmadan önce, bir token ekonomisinin nasıl işlediğini "manuel" olarak kodlayarak temel yapı taşlarını öğrenip, Basic- teml bir kontrat yazıp göstermeyi hedefledim. 

## 🚀 Neler Yapıldı? (Proje Özeti)

- **Manuel ERC20 Standartları:** `mapping`, `approve`, `transferFrom` ve `allowance` mekanizmalarını OpenZeppelin kullanmadan sıfırdan kodladım.
- **Marketplace (Pazar Yeri):** Bir akıllı kontratın diğer bir token ile nasıl etkileşime gireceğini, ürün alım-satım ve iade mantığını kurguladım.
- **Staking Kontratı:** Blok zamanı (`block.timestamp`) üzerinden pasif gelir ve ödül hesaplama algoritmasını entegre ettim.
- **Güvenlik Katmanı:** Projenin profesyonel kısımlarında OpenZeppelin'in `ReentrancyGuard` (Saldırı koruması) ve `Ownable` (Yetkilendirme) standartlarını kullandım.

## 🛠️ Kullanılan Teknolojiler

- **Solidity (^0.8.20):** Akıllı kontrat dili.
- **Hardhat (v2.22.2):** Geliştirme, derleme ve test ortamı.
- **Ethers.js:** Blockchain ile etkileşim kütüphanesi.
- **Chai & Mocha:** Akıllı kontratların doğruluğunu kanıtlayan 12 kapsamlı test senaryosu.
- **OpenZeppelin:** Endüstri standardı güvenlik kütüphaneleri.

## 🧪 Testleri Çalıştırma

Projedeki 12 test senaryosunu doğrulamak için:

```bash
npm install
npx hardhat test