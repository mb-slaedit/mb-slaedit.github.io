# Photography Prompts — RW Apple

## Style Guide
**Real, warm, human, Angra lighting** — documentary style, golden hour preference, genuine moments.

## Prompts por Asset

### Hero Poster Frame (fallback reduced-motion)
```
Professional photo of Apple reseller storefront in Angra dos Reis, Brazil, warm golden hour lighting, modern glass facade with subtle Apple logo, inviting atmosphere, clean composition, 16:9, photorealistic, 4K, commercial photography style
```

### Store Interior (fachada-1 a fachada-5)
```
Cozy Apple reseller interior in Angra dos Reis, wooden shelves displaying iPhones and Apple Watches, warm ambient lighting, Brazilian customer being helped by friendly specialist staff, genuine interaction, 4:3, documentary candid style, natural light from windows
```

### Customer Moments (clientes-22 a clientes-31)
```
Happy Brazilian family/individual receiving new iPhone at RW Apple store, genuine smiles and excitement, store background softly blurred, warm indoor lighting, candid moment of joy, square 1:1, authentic documentary photography, diverse Brazilian people
```

### Product Cards (7 produtos)
```
Clean product photography of [iPhone 18 Pro Max Dark Cherry / iPhone 17 Pro Max Orange / iPhone 17 Orange / iPhone 16 Black / MacBook Neo Silver / Apple Watch Black Sport / iPad Silver], centered on neutral warm gray background, soft studio lighting, subtle floor reflection, commercial Apple-style aesthetic, 4:3, high detail
```

### Story Images (ScrollStory chapters)
```
Chapter 1: Customer entering RW Apple store with intention, specialist listening attentively, warm lighting, 4:3
Chapter 2: Specialist configuring iPhone, migrating photos/contacts, teaching basics, customer learning, 4:3
Chapter 3: Customer leaving happy with bag, specialist waving, trust gesture, storefront visible, 4:3
```

## Technical Specs
| Asset | Aspect Ratio | Width | Format | Loading |
|-------|--------------|-------|--------|---------|
| Hero video | 16:9 | 1280px | MP4 (H.264) | preload=auto |
| Hero poster | 16:9 | 1600px | JPG (q80) | eager |
| Fachada (5) | 4:3 | 800px | JPG (q80) | lazy |
| Clientes (10) | 1:1 | 300px | JPG (q80) | lazy |
| Produtos (7) | 4:3 | 1200px | JPG/WebP (q80) | lazy |
| Story (3) | 4:3 | 1400px | JPG (q80) | eager (1), lazy (2,3) |

## Reduced Motion Fallback
- Hero: static poster frame (first video frame extracted via ffmpeg)
- ScrollStory: images static at scale(1), no parallax
- StoreGallery: hard swap (no crossfade)
- Services parallax: static at scale(1)
