# Project image structure

ضع صور المشاريع هنا بدون تعديل مكونات React:

```text
projects/
├── andermagic/
│   └── cover.webp
├── hide-and-sink/
│   └── cover.webp
└── shinehub/
    └── cover.webp
```

كل بطاقة مشروع تشير إلى `cover.webp` المحلي الخاص بها. إذا لم يكن الملف موجودًا، ستظهر خلفية placeholder نظيفة بدل صورة خارجية أو رابط عشوائي.

أضف صورة البروفايل باسم:

```text
profile/profile-photo.webp
```

وعند عدم وجودها سيُستخدم `profile-placeholder.svg` تلقائيًا.