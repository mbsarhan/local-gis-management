# نظام إدارة المشاريع المحلية GIS

يوثّق هذا الملف حالة المشروع كما هي في **18 أبريل 2026**، ويشرح فكرة النظام، ما تم إنجازه فعليًا داخل الكود، وآلية التشغيل، مع جرد واضح للملفات والمجلدات الموجودة في المستودع.

## نظرة عامة

هذا المشروع هو **خلفية Backend مبنية بـ NestJS وTypeScript** لإدارة مشاريع المناطق التنظيمية المرتبطة ببيانات GIS داخل قاعدة بيانات PostgreSQL.  
النظام يغطي:

- إدارة المستخدمين وتسجيل الدخول.
- المصادقة باستخدام `JWT access token` و`refresh token`.
- إدارة دورة حياة المشروع من المدير إلى الفني الأول ثم الفني الثاني ثم الاعتماد النهائي.
- منح وسحب صلاحيات مرتبطة بـ `plan_boundary` بحسب تكليف الفنيين بالمشاريع.
- الدمج بين `Prisma` للعمليات الاعتيادية و`pg` للاستعلامات والدوال وعمليات PostgreSQL الخاصة.

## ما تم إنجازه

تم تنفيذ الأجزاء التالية داخل المشروع:

- تجهيز تطبيق NestJS مع نقطة تشغيل رئيسية `src/main.ts` وموديول جذري `src/app.module.ts`.
- إنشاء `DatabaseModule` عالمي لتوفير `PrismaService` و`PgPoolService` في كل التطبيق.
- بناء **وحدة المستخدمين** بشكل كامل تقريبًا:
  - تسجيل الدخول.
  - إصدار `access token` و`refresh token`.
  - تحديث `refresh token` وتسجيل الخروج.
  - جلب المستخدمين عبر دالة قاعدة البيانات `get_all_users`.
  - إضافة مستخدم جديد.
  - تعطيل المستخدم وإعادة تفعيله.
  - تغيير كلمة المرور.
  - تغيير نوع المستخدم.
- بناء **وحدة المشاريع** بشكل كامل تقريبًا:
  - إنشاء مشروع جديد.
  - جلب المشاريع.
  - بدء المشروع من قبل المدير.
  - إسناد الفني الأول.
  - بدء الفني الأول للعمل.
  - تأكيد إنجاز الفني الأول.
  - إسناد الفني الثاني.
  - بدء الفني الثاني للعمل.
  - تأكيد إنجاز الفني الثاني.
  - إعادة المشروع إلى الفني الأول عند الحاجة.
  - اعتماد المدير النهائي للمشروع.
- تطبيق حراس حماية `AuthGuard` و`RefreshTokenGuard` على المسارات الحساسة.
- إضافة `GlobalExceptionFilter` لمعالجة أخطاء NestJS وأخطاء PostgreSQL بشكل موحد.
- بناء `Project` entity تحتوي قواعد الانتقال بين الحالات المختلفة للمشروع.
- بناء مستودعات Prisma للمستخدمين والمشاريع مع واجهات `Repository Interfaces` واضحة.
- توليد مخرجات البناء داخل `dist/`.

## المعمارية

المشروع يتبع تقسيمًا قريبًا من **Clean / Hexagonal Architecture** داخل كل Module:

```text
module/
├── presentation/      # Controllers + DTOs
├── application/       # Use Cases
├── domain/            # Entities + Repository Interfaces
└── infrastructure/    # Prisma repositories + SQL queries
```

### الطبقات المستخدمة

- `presentation`: استقبال الطلبات HTTP وتحويلها إلى حالات استخدام.
- `application`: تنسيق منطق التنفيذ والتحقق من الشروط.
- `domain`: الكيانات وقواعد العمل الأساسية.
- `infrastructure`: الوصول إلى البيانات عبر Prisma و PostgreSQL.

## التقنيات المستخدمة

| المجال | التقنية |
|---|---|
| Backend Framework | `NestJS 10` |
| اللغة | `TypeScript 5` |
| قاعدة البيانات | `PostgreSQL` |
| ORM | `Prisma` |
| JWT | `@nestjs/jwt` |
| اتصال PostgreSQL مباشر | `pg` |
| Runtime | `Node.js` |

## الموديولات الرئيسية

### 1. Users Module

المسار: `src/modules/users`

المسؤوليات:

- تسجيل الدخول والتحقق من بيانات المستخدم.
- إصدار التوكنات وحفظ `refresh_token` في قاعدة البيانات.
- تسجيل الخروج بإبطال `refresh_token`.
- جلب جميع المستخدمين.
- إضافة مستخدم جديد وإنشاء PostgreSQL role له.
- تعطيل وتفعيل حسابات المستخدمين.
- تغيير كلمة المرور ونوع المستخدم.

أهم الملفات:

- `users.module.ts`
- `presentation/users.controller.ts`
- `presentation/dto/users.dto.ts`
- `application/use-cases/*`
- `domain/entities/user.entity.ts`
- `domain/repositories/users.repository.interface.ts`
- `infrastructure/prisma/users.prisma.repository.ts`
- `infrastructure/prisma/users.queries.ts`

### 2. Projects Module

المسار: `src/modules/projects`

المسؤوليات:

- إنشاء المشروع وربطه بالمدير والطبقة والمنطقة التنظيمية.
- التحكم الكامل بسير العمل بين المدير والفنيين.
- التحقق من أن المستخدم الصحيح هو من ينفذ الانتقال.
- منح صلاحية `user_privilege` عند تكليف الفني.
- سحب الصلاحية عندما لا تبقى له مشاريع نشطة على نفس `plan_boundary`.

أهم الملفات:

- `projects.module.ts`
- `presentation/projects.controller.ts`
- `presentation/dto/projects.dto.ts`
- `application/use-cases/*`
- `domain/entities/project.entity.ts`
- `domain/repositories/projects.repository.interface.ts`
- `infrastructure/prisma/projects.prisma.repository.ts`
- `infrastructure/prisma/projects.queries.ts`

## دورة حياة المشروع

الحالات المنفذة حاليًا في `ProjectStatus`:

| الحالة | القيمة |
|---|---|
| `NEW` | `1` |
| `MANAGER_WORKING` | `3` |
| `ASSIGNED_TECHNICIAN_1` | `4` |
| `TECHNICIAN_1_WORKING` | `5` |
| `TECHNICIAN_1_CONFIRMED` | `6` |
| `ASSIGNED_TECHNICIAN_2` | `7` |
| `TECHNICIAN_2_WORKING` | `8` |
| `TECHNICIAN_2_CONFIRMED` | `9` |
| `RETURNED_TECHNICIAN_1` | `10` |
| `MANAGER_CONFIRMED` | `12` |

التدفق:

```text
NEW
  -> MANAGER_WORKING
  -> ASSIGNED_TECHNICIAN_1
  -> TECHNICIAN_1_WORKING
  -> TECHNICIAN_1_CONFIRMED
  -> ASSIGNED_TECHNICIAN_2
  -> TECHNICIAN_2_WORKING
  -> TECHNICIAN_2_CONFIRMED
     -> RETURNED_TECHNICIAN_1
     أو
     -> MANAGER_CONFIRMED
```

## المصادقة والحماية

الآلية الحالية:

- `POST /api/users/login` يعيد:
  - `access_token`
  - `refresh_token`
  - معلومات المستخدم الأساسية
- `AuthGuard` يتحقق من `Authorization: Bearer <token>`.
- `RefreshTokenGuard` يتحقق من `refresh token`.
- `refresh_token` يُحفظ في قاعدة البيانات، لذلك يمكن إبطاله عند تسجيل الخروج.

الملفات المسؤولة:

- `src/shared/services/token.service.ts`
- `src/shared/guards/auth.guard.ts`
- `src/shared/guards/refresh-token.guard.ts`
- `src/modules/users/application/use-cases/login.use-case.ts`
- `src/modules/users/application/use-cases/refresh-token.use-case.ts`
- `src/modules/users/application/use-cases/logout.use-case.ts`

## نقاط النهاية API

### Users

| Method | Endpoint | الوصف |
|---|---|---|
| `POST` | `/api/users/login` | تسجيل الدخول |
| `POST` | `/api/users/refresh` | تجديد access token |
| `POST` | `/api/users/logout` | تسجيل الخروج |
| `GET` | `/api/users` | جلب المستخدمين |
| `POST` | `/api/users` | إضافة مستخدم |
| `PATCH` | `/api/users/:id/deactivate` | تعطيل مستخدم |
| `PATCH` | `/api/users/:id/reactivate` | إعادة تفعيل مستخدم |
| `PATCH` | `/api/users/:id/change-password` | تغيير كلمة المرور |
| `PATCH` | `/api/users/:id/change-type` | تغيير نوع المستخدم |

### Projects

| Method | Endpoint | الوصف |
|---|---|---|
| `GET` | `/api/projects` | جلب المشاريع |
| `POST` | `/api/projects` | إنشاء مشروع |
| `PATCH` | `/api/projects/:id/start` | بدء المشروع من المدير |
| `PATCH` | `/api/projects/:id/assign-technician-1` | إسناد الفني الأول |
| `PATCH` | `/api/projects/:id/technician-1-start` | بدء الفني الأول |
| `PATCH` | `/api/projects/:id/technician-1-confirm` | تأكيد الفني الأول |
| `PATCH` | `/api/projects/:id/assign-technician-2` | إسناد الفني الثاني |
| `PATCH` | `/api/projects/:id/technician-2-start` | بدء الفني الثاني |
| `PATCH` | `/api/projects/:id/technician-2-confirm` | تأكيد الفني الثاني |
| `PATCH` | `/api/projects/:id/return-to-technician-1` | إعادة المشروع للفني الأول |
| `PATCH` | `/api/projects/:id/manager-confirm` | اعتماد المدير النهائي |

## قاعدة البيانات

الملف المسؤول: `prisma/schema.prisma`

أهم الجداول/الموديلات المستخدمة مباشرة في منطق التطبيق:

- `User`
- `UserType`
- `Group`
- `RegulatoryAreaProject`
- `StatusRegulatoryAreaProject`
- `Layer`
- `UserPrivilege`

كما يحتوي `schema.prisma` على نماذج GIS إضافية مرتبطة ببيئة البيانات مثل:

- `plan_boundary`
- `governorate`
- `township`
- `community`
- `road`
- `regulatory_blocks`
- `wall`
- `roof`
- `qgis_projects`
- وغيرها من الجداول الموروثة من قاعدة البيانات الفعلية

## التشغيل

### المتطلبات

- `Node.js`
- `PostgreSQL`
- ملف `.env` مضبوط بالقيم الصحيحة

### الأوامر

```bash
npm install
npx prisma generate
npm run dev
```

أوامر أخرى:

```bash
npm run build
npm run start
```

### متغيرات البيئة المطلوبة

لا يجب وضع القيم السرية الحقيقية داخل README. المتغيرات المطلوبة من الكود الحالي هي:

```env
DATABASE_URL=
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
JWT_SECRET=
JWT_REFRESH_SECRET=
JWT_EXPIRES_IN=
JWT_REFRESH_EXPIRES_IN=
PORT=
```

## ملاحظات تقنية مهمة

- المشروع يستخدم `Prisma` و`pg` معًا:
  - `Prisma` للعمليات الاعتيادية.
  - `pg` للدوال والاستعلامات الخاصة وعمليات PostgreSQL الإدارية.
- تجزئة كلمات المرور الحالية تتم باستخدام `MD5` داخل `users.prisma.repository.ts`.
- يوجد `GlobalExceptionFilter` لمعالجة أخطاء PostgreSQL مثل:
  - `23505`
  - `23503`
  - `P0001`
- لا توجد سكربتات اختبارات آلية داخل `package.json` حاليًا.
- يوجد ملف قديم باسم `src/app.js` يبدو من نسخة Express سابقة، بينما التشغيل الحالي الفعلي يعتمد على `NestJS` عبر `src/main.ts`.
- يحتوي `dist/` على ملفات بناء مولدة، كما يظهر به أثر قديم لمجلد `raw-sql` داخل `users` غير موجود حاليًا في `src/`.
- يوجد كل من `package-lock.json` و`pnpm-lock.yaml`، ما يعني أن المشروع استُخدم معه أكثر من مدير حزم.

## جرد الملفات والمجلدات

### 1. عناصر الجذر الموجودة حاليًا

```text
local-gis-management/
├── .git/
├── dist/
├── node_modules/
├── prisma/
├── src/
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── README.md
└── tsconfig.json
```

### 2. شجرة ملفات المصدر `src/`

```text
src/
├── app.js
├── app.module.ts
├── main.ts
├── modules/
│   ├── projects/
│   │   ├── projects.module.ts
│   │   ├── application/
│   │   │   └── use-cases/
│   │   │       ├── assign-technician-1.use-case.ts
│   │   │       ├── assign-technician-2.use-case.ts
│   │   │       ├── create-project.use-case.ts
│   │   │       ├── get-projects.use-case.ts
│   │   │       ├── manager-confirm.use-case.ts
│   │   │       ├── return-to-technician-1.use-case.ts
│   │   │       ├── start-project.use-case.ts
│   │   │       ├── technician-1-confirm.use-case.ts
│   │   │       ├── technician-1-start.use-case.ts
│   │   │       ├── technician-2-confirm.use-case.ts
│   │   │       └── technician-2-start.use-case.ts
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   └── project.entity.ts
│   │   │   └── repositories/
│   │   │       └── projects.repository.interface.ts
│   │   ├── infrastructure/
│   │   │   └── prisma/
│   │   │       ├── projects.prisma.repository.ts
│   │   │       └── projects.queries.ts
│   │   └── presentation/
│   │       ├── projects.controller.ts
│   │       └── dto/
│   │           └── projects.dto.ts
│   └── users/
│       ├── users.module.ts
│       ├── application/
│       │   └── use-cases/
│       │       ├── add-user.use-case.ts
│       │       ├── change-password.use-case.ts
│       │       ├── change-user-type.use-case.ts
│       │       ├── deactivate-user.use-case.ts
│       │       ├── get-all-users.use-case.ts
│       │       ├── login.use-case.ts
│       │       ├── logout.use-case.ts
│       │       ├── reactivate-user.use-case.ts
│       │       └── refresh-token.use-case.ts
│       ├── domain/
│       │   ├── entities/
│       │   │   └── user.entity.ts
│       │   └── repositories/
│       │       └── users.repository.interface.ts
│       ├── infrastructure/
│       │   └── prisma/
│       │       ├── users.prisma.repository.ts
│       │       └── users.queries.ts
│       └── presentation/
│           ├── users.controller.ts
│           └── dto/
│               └── users.dto.ts
└── shared/
    ├── config/
    │   └── config.service.ts
    ├── database/
    │   ├── database.module.ts
    │   ├── pg-pool.service.ts
    │   └── prisma.service.ts
    ├── filters/
    │   └── global-exception.filter.ts
    ├── guards/
    │   ├── auth.guard.ts
    │   └── refresh-token.guard.ts
    └── services/
        └── token.service.ts
```

### 3. شجرة ملفات Prisma

```text
prisma/
└── schema.prisma
```

### 4. شجرة مخرجات البناء `dist/`

> هذا المجلد مولد تلقائيًا بعد عملية البناء، لكنه موجود حاليًا في المستودع لذلك تم توثيقه.

```text
dist/
├── app.module.d.ts
├── app.module.js
├── app.module.js.map
├── main.d.ts
├── main.js
├── main.js.map
├── tsconfig.tsbuildinfo
├── modules/
│   ├── projects/
│   │   ├── projects.module.d.ts
│   │   ├── projects.module.js
│   │   ├── projects.module.js.map
│   │   ├── application/
│   │   │   └── use-cases/
│   │   │       ├── assign-technician-1.use-case.d.ts
│   │   │       ├── assign-technician-1.use-case.js
│   │   │       ├── assign-technician-1.use-case.js.map
│   │   │       ├── assign-technician-2.use-case.d.ts
│   │   │       ├── assign-technician-2.use-case.js
│   │   │       ├── assign-technician-2.use-case.js.map
│   │   │       ├── create-project.use-case.d.ts
│   │   │       ├── create-project.use-case.js
│   │   │       ├── create-project.use-case.js.map
│   │   │       ├── get-projects.use-case.d.ts
│   │   │       ├── get-projects.use-case.js
│   │   │       ├── get-projects.use-case.js.map
│   │   │       ├── manager-confirm.use-case.d.ts
│   │   │       ├── manager-confirm.use-case.js
│   │   │       ├── manager-confirm.use-case.js.map
│   │   │       ├── return-to-technician-1.use-case.d.ts
│   │   │       ├── return-to-technician-1.use-case.js
│   │   │       ├── return-to-technician-1.use-case.js.map
│   │   │       ├── start-project.use-case.d.ts
│   │   │       ├── start-project.use-case.js
│   │   │       ├── start-project.use-case.js.map
│   │   │       ├── technician-1-confirm.use-case.d.ts
│   │   │       ├── technician-1-confirm.use-case.js
│   │   │       ├── technician-1-confirm.use-case.js.map
│   │   │       ├── technician-1-start.use-case.d.ts
│   │   │       ├── technician-1-start.use-case.js
│   │   │       ├── technician-1-start.use-case.js.map
│   │   │       ├── technician-2-confirm.use-case.d.ts
│   │   │       ├── technician-2-confirm.use-case.js
│   │   │       ├── technician-2-confirm.use-case.js.map
│   │   │       ├── technician-2-start.use-case.d.ts
│   │   │       ├── technician-2-start.use-case.js
│   │   │       └── technician-2-start.use-case.js.map
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   ├── project.entity.d.ts
│   │   │   │   ├── project.entity.js
│   │   │   │   └── project.entity.js.map
│   │   │   └── repositories/
│   │   │       ├── projects.repository.interface.d.ts
│   │   │       ├── projects.repository.interface.js
│   │   │       └── projects.repository.interface.js.map
│   │   ├── infrastructure/
│   │   │   └── prisma/
│   │   │       ├── projects.prisma.repository.d.ts
│   │   │       ├── projects.prisma.repository.js
│   │   │       ├── projects.prisma.repository.js.map
│   │   │       ├── projects.queries.d.ts
│   │   │       ├── projects.queries.js
│   │   │       └── projects.queries.js.map
│   │   └── presentation/
│   │       ├── projects.controller.d.ts
│   │       ├── projects.controller.js
│   │       ├── projects.controller.js.map
│   │       └── dto/
│   │           ├── projects.dto.d.ts
│   │           ├── projects.dto.js
│   │           └── projects.dto.js.map
│   └── users/
│       ├── users.module.d.ts
│       ├── users.module.js
│       ├── users.module.js.map
│       ├── application/
│       │   └── use-cases/
│       │       ├── add-user.use-case.d.ts
│       │       ├── add-user.use-case.js
│       │       ├── add-user.use-case.js.map
│       │       ├── change-password.use-case.d.ts
│       │       ├── change-password.use-case.js
│       │       ├── change-password.use-case.js.map
│       │       ├── change-user-type.use-case.d.ts
│       │       ├── change-user-type.use-case.js
│       │       ├── change-user-type.use-case.js.map
│       │       ├── deactivate-user.use-case.d.ts
│       │       ├── deactivate-user.use-case.js
│       │       ├── deactivate-user.use-case.js.map
│       │       ├── get-all-users.use-case.d.ts
│       │       ├── get-all-users.use-case.js
│       │       ├── get-all-users.use-case.js.map
│       │       ├── login.use-case.d.ts
│       │       ├── login.use-case.js
│       │       ├── login.use-case.js.map
│       │       ├── logout.use-case.d.ts
│       │       ├── logout.use-case.js
│       │       ├── logout.use-case.js.map
│       │       ├── reactivate-user.use-case.d.ts
│       │       ├── reactivate-user.use-case.js
│       │       ├── reactivate-user.use-case.js.map
│       │       ├── refresh-token.use-case.d.ts
│       │       ├── refresh-token.use-case.js
│       │       └── refresh-token.use-case.js.map
│       ├── domain/
│       │   ├── entities/
│       │   │   ├── user.entity.d.ts
│       │   │   ├── user.entity.js
│       │   │   └── user.entity.js.map
│       │   └── repositories/
│       │       ├── users.repository.interface.d.ts
│       │       ├── users.repository.interface.js
│       │       └── users.repository.interface.js.map
│       ├── infrastructure/
│       │   ├── prisma/
│       │   │   ├── users.prisma.repository.d.ts
│       │   │   ├── users.prisma.repository.js
│       │   │   ├── users.prisma.repository.js.map
│       │   │   ├── users.queries.d.ts
│       │   │   ├── users.queries.js
│       │   │   └── users.queries.js.map
│       │   └── raw-sql/
│       │       ├── users.raw-sql.repository.d.ts
│       │       ├── users.raw-sql.repository.js
│       │       └── users.raw-sql.repository.js.map
│       └── presentation/
│           ├── users.controller.d.ts
│           ├── users.controller.js
│           ├── users.controller.js.map
│           └── dto/
│               ├── users.dto.d.ts
│               ├── users.dto.js
│               └── users.dto.js.map
└── shared/
    ├── config/
    │   ├── config.service.d.ts
    │   ├── config.service.js
    │   └── config.service.js.map
    ├── database/
    │   ├── database.module.d.ts
    │   ├── database.module.js
    │   ├── database.module.js.map
    │   ├── pg-pool.service.d.ts
    │   ├── pg-pool.service.js
    │   ├── pg-pool.service.js.map
    │   ├── prisma.service.d.ts
    │   ├── prisma.service.js
    │   └── prisma.service.js.map
    ├── filters/
    │   ├── global-exception.filter.d.ts
    │   ├── global-exception.filter.js
    │   └── global-exception.filter.js.map
    ├── guards/
    │   ├── auth.guard.d.ts
    │   ├── auth.guard.js
    │   ├── auth.guard.js.map
    │   ├── refresh-token.guard.d.ts
    │   ├── refresh-token.guard.js
    │   └── refresh-token.guard.js.map
    └── services/
        ├── token.service.d.ts
        ├── token.service.js
        └── token.service.js.map
```

### 5. مجلدات موجودة ولم تُفصّل بالكامل

- `.git/`: بيانات Git الداخلية.
- `node_modules/`: تبعيات الحزم المثبتة محليًا، ويحتوي عددًا كبيرًا جدًا من الملفات المولدة من مديري الحزم، لذلك ذُكر كجزء موجود من المشروع دون إدراج كل ملف بداخله داخل README.

## ملخص الحالة الحالية

المشروع يحتوي على نواة Backend واضحة وقابلة للتشغيل، مع منطق عمل حقيقي للمستخدمين والمشاريع وصلاحيات التنفيذ.  
أكثر الأجزاء اكتمالًا حاليًا هي:

- طبقة المصادقة.
- إدارة المستخدمين.
- دورة حياة المشروع.
- الربط مع PostgreSQL وPrisma.

الأجزاء التي تستحق تحسينًا لاحقًا:

- إضافة اختبارات.
- استبدال `MD5` بخيار أقوى مثل `bcrypt` أو `argon2`.
- تنظيف الملفات القديمة أو الموروثة مثل `src/app.js` وبعض آثار `dist`.
- توحيد مدير الحزم المستخدم.
