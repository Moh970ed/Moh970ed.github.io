# شرح ملفات الموقع بالعربية

هذا الملف يشرح وظيفة كل جزء في النسخة المعلّقة من الموقع. أضفت التعليقات داخل الملفات المخصصة التي تحتوي على منطق الموقع، أما ملفات `src/components/ui` فهي مكونات جاهزة من نمط **shadcn/ui + Radix**؛ لذلك شرحت وظيفة كل ملف هنا بدل تكرار نفس التعليق داخل عشرات الملفات المتشابهة.

## شكل التطبيق

1. `index.html` يجهز صفحة HTML الأساسية، وخصوصًا عنصر `<div id="root">`.
2. `src/main.tsx` يركب مكوّن `App` داخل عنصر `root`.
3. `src/App.tsx` يحتوي على الصفحة كاملة: شاشة البداية، المؤشر، الخلفية، شريط التنقل، المقدمة، النبذة، المشاريع، المهارات والتواصل.
4. `src/index.css` يضع ألوان الثيم والخطوط والتوهجات والأنماط العامة.
5. `src/components` يحتوي المؤثرات والمكونات المخصصة.
6. `src/components/ui` يحتوي مكونات واجهة قابلة لإعادة الاستخدام.
7. `.github/workflows/deploy.yml` يبني المشروع وينشر مجلد `dist` على GitHub Pages بعد كل push إلى `main`.

## تحسينات المحتوى وتجربة الاستخدام

- تم الحفاظ على الهوية البصرية الحالية مع إعادة ترتيب الصفحة إلى: Hero، About، Education، Training، Skills، Services، Projects، Contact.
- تمت إضافة قائمة تنقل كاملة لكل الأقسام، مع زر hamburger للموبايل وإغلاق القائمة بعد اختيار أي رابط.
- تم تفعيل smooth scrolling و`scroll-margin-top` حتى لا يختفي عنوان القسم خلف الـ Navbar.
- تم استبدال لوحة `SYS.INIT //` في الـ Hero بمساحة صورة شخصية. أضف الصورة باسم `public/assets/images/profile/profile-photo.webp`، وسيظهر placeholder محلي تلقائيًا إلى أن تضيف الصورة.
- كل مشروع يستخدم مسارًا محليًا ثابتًا لصورة الغلاف داخل `public/assets/images/projects/.../cover.webp`، بدون روابط صور خارجية.
- تمت إزالة `First_Game` نهائيًا لأن التركيز الآن على المشاريع الأقوى: AnderMagic وHide and Sink وShineHub.
- تمت إضافة Services بثلاثة عروض واضحة: Game Development وMobile App Development وSoftware Development.
- تم تحسين Contact برسالة `Have an idea worth building?` وزر `Let's Talk` والبريد ورقم الهاتف.

## الملفات المخصصة

### `src/App.tsx`

- **الاستيرادات:** React للحالة ودورة حياة المكونات، Framer Motion للحركة، Lucide وReact Icons للأيقونات، والمكونات الثلاثة المخصصة.
- **`NeonCursor`:** يستخدم `useMotionValue` و`useSpring` لتحريك نقطة وحلقة خلف مؤشر الماوس. حالة `hovering` تكبر الحلقة عند الروابط والأزرار.
- **`IntroAnimation`:** يحجب التمرير، يعرض `ShaderAnimation`، ثم يبدأ fade-out بعد 2.2 ثانية ويبلغ `App` بانتهاء المقدمة.
- **`Starfield`:** ينشئ 150 نجمة على Canvas. كل frame يحدّث الموقع، يطبق parallax بسيطًا حسب الماوس، ثم يعيد الرسم.
- **`Navbar`:** يراقب `scrollY` ليغير الخلفية والـ blur بعد التمرير. روابطه تستخدم anchors داخل الصفحة، وزر CV يحمّل ملف PDF من `public`.
- **`Hero`:** يبدل بين Game Developer وMobile App Developer وJunior Software Engineer كل ثلاث ثوانٍ، ويعرض روابط GitHub وLinkedIn والبريد وItch.io.
- **`Marquee`:** يكرر الكلمات داخل `motion.div` ويحرّكها أفقيًا بلا توقف.
- **`SectionHeading`:** عنوان عام للأقسام مع رقم زخرفي وحركة دخول عند الظهور.
- **`About`:** نبذة مهنية وقيمة واضحة فقط؛ تم فصل التعليم والتدريب في قسمين مستقلين.
- **`Education`:** يعرض درجة البكالوريوس في FCAI بجامعة Matrouh University.
- **`Training`:** يعرض تدريب Flutter الحالي في DEBI ومجالات التركيز العملية.
- **`projects`:** مصفوفة بيانات؛ كل عنصر يحمل النصوص والألوان والتقنيات والرابط الخاص بالمشروع.
- **`ProjectContent`:** يحول عنصرًا من `projects` إلى تفاصيل مرئية: وصف، رابط، السنة، النوع والتقنيات.
- **`Projects`:** يمرر AnderMagic وHide and Sink وShineHub إلى `StickyTabs.Item`.
- **`Services`:** يعرض الخدمات التي يمكن تقديمها منفصلة عن قائمة المهارات.
- **`skillCategories`:** بيانات المهارات مقسمة إلى لغات، أدوات وأمن سيبراني. القيمة `null` للأيقونة تعني أن الشبكة ستستخدم أول حرف من اسم المهارة.
- **`SkillGrid`:** يرسم شبكة المهارات ويختار بين أيقونة حقيقية أو أول حرف.
- **`Skills`:** يعرض التصنيفات داخل Sticky Tabs.
- **`Footer`:** البريد ورقم الهاتف وروابط التواصل وحقوق النشر، مع استخدام السنة الحالية من `Date`.
- **`App`:** يتحكم في `introDone` ويرتب المكونات في شجرة الصفحة النهائية.

### `src/components/ShaderAnimation.tsx`

- **`CssFallback`:** 18 حلقة CSS بألوان وتأخيرات مختلفة؛ هذا هو المسار الآمن إذا لم يدعم المتصفح WebGL.
- **`WebGLShader`:** ينشئ Camera وScene وPlane وShaderMaterial من Three.js. الـ vertex shader يملأ الشاشة، والـ fragment shader يحسب اللون لكل pixel.
- **`uniforms`:** `time` يحرك المشهد، و`resolution` يحافظ على تناسب الرسم بعد تغيير حجم الشاشة.
- **`onResize`:** يزامن حجم renderer مع الحاوية.
- **التنظيف:** يلغي `requestAnimationFrame` وlistener ويتخلص من موارد Three.js عند إزالة المكون.
- **`isWebGLAvailable`:** يجرب إنشاء سياق WebGL قبل استخدام النسخة ثلاثية الأبعاد.
- **`ShaderAnimation`:** يختار WebGL أو CSS مرة واحدة عند بداية المكون.

### `src/components/StickyTabs.tsx`

- `StickyTabItemProps` يحدد عقد المكوّن بين الأبناء والأب.
- `StickyTabItem` لا يرسم شيئًا؛ هو marker حتى يستطيع الأب معرفة العناصر الصحيحة.
- `Children.map` و`isValidElement` يسمحان بتمرير عدة `StickyTabs.Item`.
- `stickyTop` يأخذ ارتفاع شريط التنقل حتى لا يختفي العنوان تحته.
- كل عنصر ينتج `section` مع عنوان sticky ومحتوى مستقل.
- `clsx` يدمج classes القادمة من البيانات مع classes الثابتة.

### `src/components/TextBlockAnimation.tsx`

- يسجل `SplitText` و`ScrollTrigger` في GSAP.
- يقسم النص إلى أسطر بدل تحريكه ككتلة واحدة.
- يضيف wrapper وطبقة ملونة فوق كل سطر.
- الـ timeline يوسع الطبقة، يظهر النص، ثم يسحب الطبقة من الجهة الأخرى.
- `animateOnScroll` يحدد هل يبدأ التأثير عند دخول العنصر إلى viewport.
- `ctx.revert()` يعيد DOM إلى حالته الأصلية عند unmount.

### `src/hooks/use-toast.ts`

- يعرف نموذج Toast والأحداث الممكنة.
- `reducer` ينفذ الإضافة والتعديل والإغلاق والحذف بطريقة immutable.
- `toastTimeouts` يمنع جدولة حذف العنصر نفسه أكثر من مرة.
- `memoryState` و`listeners` يجعلان الحالة مشتركة حتى بدون Provider.
- `toast()` ينشئ ID ودوال `update` و`dismiss`.
- `useToast()` يسجل component كـ listener ويزيله عند unmount.

### الملفات الصغيرة الأخرى

- `src/main.tsx`: نقطة تشغيل React.
- `src/lib/utils.ts`: دالة `cn` لدمج `clsx` مع `tailwind-merge`.
- `src/pages/not-found.tsx`: واجهة 404 احتياطية.
- `src/index.css`: مصدر الألوان والخطوط والتوهجات والشبكة والخطوط الوهمية.
- `index.html`: metadata وOpen Graph وTwitter وملف favicon.
- `vite.config.ts`: إعداد Vite وReact وTailwind والـ alias `@`.
- `tsconfig.json`: TypeScript strict مع منع إصدار ملفات.
- `components.json`: إعدادات shadcn/ui والـ aliases.
- `package.json`: scripts والمكتبات المطلوبة.
- `public/robots.txt`: يسمح لمحركات البحث بفهرسة الموقع.
- `public/favicon.svg`: أيقونة المتصفح.
- `public/opengraph.jpg`: صورة معاينة المشاركة إذا تم ربطها داخل metadata.
- `public/CV_Mohammed_ElSayed.pdf`: السيرة الذاتية التي تحملها أزرار CV.

## ملفات `src/components/ui`

كل الملفات التالية wrappers صغيرة فوق Radix أو أدوات React. النمط المتكرر فيها هو:

1. استيراد primitive من Radix أو مكوّن HTML.
2. إنشاء مكوّن باسم واضح.
3. تمرير props و`ref` إلى العنصر الأصلي.
4. دمج `className` عبر `cn`.
5. تصدير المكوّنات الفرعية عند الحاجة.

| الملف | وظيفته |
|---|---|
| `accordion.tsx` | أقسام قابلة للفتح والإغلاق. |
| `alert-dialog.tsx` | حوار تأكيد للأفعال الحساسة. |
| `alert.tsx` | رسالة تنبيه بأشكال مختلفة. |
| `aspect-ratio.tsx` | الحفاظ على نسبة أبعاد العنصر. |
| `avatar.tsx` | صورة مستخدم مع fallback. |
| `badge.tsx` | شارة صغيرة للوسوم أو الحالات. |
| `breadcrumb.tsx` | مسار التنقل بين الصفحات. |
| `button-group.tsx` | تجميع أزرار متجاورة. |
| `button.tsx` | زر بمتغيرات الشكل والحجم ودعم `asChild`. |
| `calendar.tsx` | تقويم مبني على React Day Picker. |
| `card.tsx` | حاوية بطاقة وأجزاؤها: header/content/footer. |
| `carousel.tsx` | شريط تمرير مبني على Embla. |
| `chart.tsx` | طبقة تنسيق موحدة لـ Recharts. |
| `checkbox.tsx` | مربع اختيار accessible من Radix. |
| `collapsible.tsx` | محتوى قابل للطي. |
| `command.tsx` | لوحة أوامر وبحث مبنية على cmdk. |
| `context-menu.tsx` | قائمة تظهر بزر الماوس الأيمن. |
| `dialog.tsx` | نافذة حوار modal. |
| `drawer.tsx` | لوحة تسحب من طرف الشاشة باستخدام vaul. |
| `dropdown-menu.tsx` | قائمة منسدلة مع keyboard navigation. |
| `empty.tsx` | حالة فارغة قابلة للتخصيص. |
| `field.tsx` | غلاف موحد لعناصر النماذج ورسائلها. |
| `form.tsx` | ربط React Hook Form بعناصر Radix. |
| `hover-card.tsx` | بطاقة معلومات تظهر عند المرور. |
| `input-group.tsx` | تجميع input مع addon أو action. |
| `input-otp.tsx` | إدخال رمز OTP مقسم إلى خانات. |
| `input.tsx` | input قياسي منسق. |
| `item.tsx` | صف عام لعناصر القوائم. |
| `kbd.tsx` | تمثيل اختصار لوحة المفاتيح. |
| `label.tsx` | label accessible مبني على Radix. |
| `menubar.tsx` | شريط قوائم أفقي متعدد المستويات. |
| `navigation-menu.tsx` | قائمة تنقل متقدمة وروابطها. |
| `pagination.tsx` | عناصر صفحات السابق/التالي والأرقام. |
| `popover.tsx` | محتوى عائم مرتبط بعنصر. |
| `progress.tsx` | شريط تقدم. |
| `radio-group.tsx` | مجموعة اختيار أحادي. |
| `resizable.tsx` | لوحات يمكن تغيير حجمها. |
| `scroll-area.tsx` | منطقة تمرير مخصصة. |
| `select.tsx` | قائمة اختيار accessible. |
| `separator.tsx` | خط فصل أفقي أو رأسي. |
| `sheet.tsx` | لوحة جانبية مبنية على Dialog. |
| `sidebar.tsx` | نظام sidebar كامل مع حالة responsive. |
| `skeleton.tsx` | placeholder أثناء التحميل. |
| `slider.tsx` | شريط اختيار قيمة أو نطاق. |
| `sonner.tsx` | تهيئة Toast عبر مكتبة Sonner. |
| `spinner.tsx` | مؤشر تحميل دوار. |
| `switch.tsx` | مفتاح on/off. |
| `table.tsx` | عناصر جدول منسقة. |
| `tabs.tsx` | تبويبات accessible. |
| `textarea.tsx` | حقل نص متعدد الأسطر. |
| `toaster.tsx` | يرسم Toasts التي يديرها `use-toast`. |
| `toast.tsx` | primitive ورسوم Toast الفردي. |
| `toggle-group.tsx` | مجموعة أزرار toggle. |
| `toggle.tsx` | زر يبدل حالة منطقية. |
| `tooltip.tsx` | تلميح يظهر عند المرور أو التركيز. |

## ملاحظات مهمة ظهرت أثناء القراءة

- `NeonCursor` يزيل listener الخاص بحركة الماوس فقط؛ يفضل أيضًا إزالة `mouseenter` و`mouseleave` من الروابط والأزرار في cleanup.
- تم حذف الاستيرادات غير المستخدمة من `App.tsx` (`useScroll` و`useTransform` و`ArrowRight`) حتى يمر `noUnusedLocals: true` بدون أخطاء.
- وصف `description` داخل `index.html` ما زال يحتوي عبارة `Update this description...`، لذلك يستحسن استبداله بوصف حقيقي للموقع.
- وجود مكونات UI كثيرة لا يعني أنها مستخدمة كلها في الصفحة الحالية؛ هي مكتبة جاهزة لإضافات مستقبلية.