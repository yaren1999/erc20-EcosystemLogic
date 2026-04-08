# ERC20 Token Ecosystem: Logic & Fundamentals

> Bu projede sadece hazır kod kullanmadım. İlk commitlerimde manuel yazdığım basit token yapısını görebilirsiniz. Sonrasında bu yapıyı OpenZeppelin'in güvenli kütüphaneleriyle değiştirerek profesyonel bir DeFi ekosistemine dönüştürdüm.

Bu proje, bir Blockchain Geliştiricisi (Smart Contract Developer) olma yolunda attığım temel adımları ve akıllı kontratların arkasındaki ana mantığı anlamak için geliştirdiğim çalışmaları içermektedir. 

Hazır kütüphaneleri kullanmadan önce, bir token ekonomisinin nasıl işlediğini "manuel" olarak kodlayarak temel yapı taşlarını öğrenip, Basic-temel bir kontrat yazıp göstermeyi hedefledim. 

## 🚀 Neler Yapıldı? (Proje Özeti)

- **Manuel ERC20 Standartları:** `mapping`, `approve`, `transferFrom` ve `allowance` mekanizmalarını OpenZeppelin kullanmadan sıfırdan kodladım.
- **Marketplace (Pazar Yeri):** Bir akıllı kontratın diğer bir token ile nasıl etkileşime gireceğini, ürün alım-satım ve iade mantığını kurguladım.
- **Staking Kontratı:** Blok zamanı (`block.timestamp`) üzerinden pasif gelir ve ödül hesaplama algoritmasını entegre ettim.
- **Güvenlik Katmanı:** Projenin profesyonel kısımlarında OpenZeppelin'in `ReentrancyGuard` (Saldırı koruması) ve `Ownable` (Yetkilendirme) standartlarını kullandım.

## 🛠️ Kullanılan Teknolojiler

- **Solidity (^0.8.20):** Akıllı kontrat dili.
- **Hardhat (v2.22.2):** Geliştirme, derleme ve test ortamı.
- **Ethers.js:** Blockchain ile etkileşim kütüphanesi.
- **OpenZeppelin:** Endüstri standardı güvenlik kütüphaneleri
- **Chai & Mocha:** Ekosistemin tüm parçalarını (Token-Market-Staking) kapsayan 7 kritik birim test (Unit Test).
- **Decimals Standartı:** 18 ondalık (decimals) yapısı kullanılarak gerçek dünya varlıklarıyla (ETH, USDT vb.) tam uyumluluk sağlandı.

## 🧪 Testleri Çalıştırma

Projedeki 12 test senaryosunu doğrulamak için:

```bash
npm install
npx hardhat test