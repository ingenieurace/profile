/**
 * The stack. `slug` maps to a simple-icons slug; the official path and brand
 * colour are pulled at build time. `understanding` is what gets shown when a
 * logo is opened. Describe the technology plainly and factually: what it is,
 * how it works, where it is used. No set-up-and-knock-down contrasts.
 */
export const PLATFORMS = ['Web', 'Apple', 'Android', 'Windows'] as const;
export type Platform = (typeof PLATFORMS)[number];

export interface Tech {
  slug: string;
  name: string;
  category: 'Languages' | 'Data' | 'Infrastructure' | 'Server' | 'Client' | 'Embedded' | 'AI';
  /**
   * Which sub-tab a Client entry sits under on the stack page. Required for
   * Client, ignored elsewhere. Empty platforms are not shown.
   */
  platform?: Platform;
  /**
   * A programming language, wherever it is filed. Languages are listed under
   * the area they are used in, so the front page counts this flag rather than
   * a category.
   */
  language?: true;
  tagline: string;
  understanding: string[];
  points: string[];
  /** Chinese edition. Merged over the English fields by localize(). */
  zh: {
    tagline: string;
    understanding: string[];
    points: string[];
  };
}

export const TECH: Tech[] = [
  {
    slug: 'go',
    name: 'Go',
    category: 'Server',
    language: true,
    tagline: 'A compiled language from Google, built around goroutines and a small, stable feature set.',
    understanding: [
      'Go compiles to a single static binary and ships with a garbage collector, a scheduler and a standard library that covers HTTP, JSON, testing and profiling. Goroutines are lightweight threads managed by the runtime; channels pass values between them, and the `sync` package provides mutexes and wait groups.',
      'The language changes slowly and keeps a short list of features. Generics arrived in 1.18; error handling uses explicit return values. `gofmt` fixes a single formatting style, so code from different authors reads the same way. It is widely used for network services, command-line tools and cloud infrastructure such as Docker and Kubernetes.',
    ],
    points: [
      'The runtime multiplexes goroutines onto OS threads (the GMP model) and hands the processor to another thread when one blocks in a system call',
      'The garbage collector is concurrent with sub-millisecond pauses; collection frequency follows the allocation rate, tuned with GOGC and GOMEMLIMIT',
      '`context.Context` carries cancellation and deadlines across goroutines and API boundaries',
    ],
    zh: {
      tagline: 'Google 推出的编译型语言，以 goroutine 和一套精简、稳定的特性为核心。',
      understanding: [
        'Go 编译成单个静态二进制文件，自带垃圾回收器、调度器，以及覆盖 HTTP、JSON、测试和性能分析的标准库。goroutine 是由运行时管理的轻量线程；channel 在它们之间传递值，`sync` 包提供互斥锁和 WaitGroup。',
        '这门语言演进缓慢，特性清单很短。泛型在 1.18 加入；错误处理使用显式返回值。`gofmt` 规定了统一的格式，不同作者写的代码读起来一致。它广泛用于网络服务、命令行工具，以及 Docker、Kubernetes 这类云基础设施。',
      ],
      points: [
        '运行时把 goroutine 复用到操作系统线程上（GMP 模型），某个线程阻塞在系统调用里时，处理器会交给另一个线程',
        '垃圾回收器并发运行，停顿在亚毫秒级；回收频率跟随分配速率，可用 GOGC 和 GOMEMLIMIT 调整',
        '`context.Context` 在 goroutine 之间、跨 API 边界传递取消信号和截止时间',
      ],
    },
  },
  {
    slug: 'rust',
    name: 'Rust',
    category: 'Server',
    language: true,
    tagline: 'A systems language that checks memory safety at compile time through ownership and borrowing.',
    understanding: [
      'Every value in Rust has one owner, and references to it are checked by the borrow checker: any number of shared references, or exactly one mutable reference, at a time. These rules let the compiler rule out use-after-free, double free and data races without a garbage collector.',
      'Rust compiles through LLVM to native code with performance close to C and C++. Cargo handles builds, dependencies, tests and documentation. It is used for command-line tools, browsers, databases, embedded systems, WebAssembly, and parts of the Linux and Windows kernels.',
    ],
    points: [
      'Lifetimes describe how long a reference stays valid; most are inferred, and explicit annotations appear mainly in function signatures and structs',
      '`Send` and `Sync` mark which types may move or be shared across threads, so data races are compile errors',
      '`unsafe` blocks allow raw pointers and FFI; the surrounding code is expected to uphold the invariants the compiler cannot check',
    ],
    zh: {
      tagline: '一门系统编程语言，通过所有权和借用在编译期检查内存安全。',
      understanding: [
        'Rust 中每个值都有唯一的所有者，对它的引用由借用检查器检查：同一时刻可以有任意多个共享引用，或者恰好一个可变引用。这些规则让编译器在没有垃圾回收的情况下排除释放后使用、重复释放和数据竞争。',
        'Rust 经由 LLVM 编译为本地代码，性能接近 C 和 C++。Cargo 负责构建、依赖、测试和文档。它被用于命令行工具、浏览器、数据库、嵌入式系统、WebAssembly，以及 Linux 和 Windows 内核的部分模块。',
      ],
      points: [
        '生命周期描述引用保持有效的时间范围；大多数可以推断，显式标注主要出现在函数签名和结构体中',
        '`Send` 和 `Sync` 标明哪些类型可以跨线程移动或共享，数据竞争因此成为编译错误',
        '`unsafe` 块允许裸指针和 FFI；由周围的代码负责维护编译器无法检查的不变量',
      ],
    },
  },
  {
    slug: 'c',
    name: 'C',
    category: 'Embedded',
    language: true,
    tagline: 'A small, low-level language that maps closely to the machine and underlies most operating systems.',
    understanding: [
      'C exposes memory directly through pointers and leaves allocation and lifetime to the programmer via `malloc` and `free`. Its compiled output is predictable and close to the hardware, and its calling convention is the common interface other languages use to talk to system libraries.',
      'Unix, Linux, the major databases, language runtimes and most embedded firmware are written in C. The standard defines undefined behaviour for cases such as out-of-bounds access and signed overflow, and optimising compilers rely on those rules when transforming code.',
    ],
    points: [
      'Sanitizers (ASan, UBSan, TSan) and Valgrind detect memory errors and undefined behaviour at run time',
      'Allocators such as glibc malloc, jemalloc and tcmalloc use arenas and per-thread caches, which affect fragmentation and memory usage',
      'The C ABI is the standard boundary for FFI from Rust, Go, Python and most other languages',
    ],
    zh: {
      tagline: '一门小巧的底层语言，贴近机器，是大多数操作系统的基础。',
      understanding: [
        'C 通过指针直接操作内存，由程序员用 `malloc` 和 `free` 管理分配与生命周期。它的编译产物可预测、贴近硬件，它的调用约定也是其他语言调用系统库时共用的接口。',
        'Unix、Linux、主流数据库、各种语言运行时和大部分嵌入式固件都用 C 编写。标准为越界访问、有符号溢出等情况定义了未定义行为，优化编译器在变换代码时会依赖这些规则。',
      ],
      points: [
        'Sanitizer（ASan、UBSan、TSan）和 Valgrind 可在运行时检测内存错误和未定义行为',
        'glibc malloc、jemalloc、tcmalloc 等分配器使用 arena 和线程本地缓存，影响内存碎片和占用',
        'C ABI 是 Rust、Go、Python 等大多数语言做 FFI 时的标准边界',
      ],
    },
  },
  {
    slug: 'stmicroelectronics',
    name: 'STM32',
    category: 'Embedded',
    tagline: "STMicroelectronics' family of 32-bit microcontrollers built on Arm Cortex-M cores.",
    understanding: [
      'STM32 is a large family of microcontrollers, from low-power Cortex-M0+ parts to Cortex-M7 and dual-core Cortex-M7/M4 parts running at several hundred megahertz. Each chip combines the core with flash, SRAM and peripherals such as GPIO, timers, ADCs, DMA, UART, SPI, I2C, USB and CAN.',
      'Firmware is usually written in C. STM32CubeMX generates clock trees, pin assignments and initialisation code, and the HAL and lower-level LL libraries wrap the peripheral registers. Programs run bare-metal or on an RTOS such as FreeRTOS or Zephyr, and are flashed and debugged over SWD with an ST-LINK probe.',
    ],
    points: [
      'Peripherals are driven through memory-mapped registers; the HAL is convenient, and the LL layer or direct register access is used where timing or code size matters',
      'Interrupts are prioritised by the NVIC, and DMA moves data between peripherals and memory without occupying the CPU',
      'Low-power modes (Sleep, Stop, Standby) turn off clocks and regulators, and the wake-up sources decide how the chip comes back',
    ],
    zh: {
      tagline: '意法半导体基于 Arm Cortex-M 内核的 32 位微控制器系列。',
      understanding: [
        'STM32 是一个庞大的微控制器家族，从低功耗的 Cortex-M0+ 型号，到主频数百兆赫的 Cortex-M7 以及 M7/M4 双核型号。每颗芯片都把内核与闪存、SRAM，以及 GPIO、定时器、ADC、DMA、UART、SPI、I2C、USB、CAN 等外设集成在一起。',
        '固件通常用 C 编写。STM32CubeMX 生成时钟树、引脚分配和初始化代码，HAL 库和更底层的 LL 库封装了外设寄存器。程序可以裸机运行，也可以运行在 FreeRTOS、Zephyr 等 RTOS 上，通过 ST-LINK 调试器经 SWD 接口烧录和调试。',
      ],
      points: [
        '外设通过内存映射寄存器驱动；HAL 用起来方便，对时序或代码体积有要求时改用 LL 层或直接操作寄存器',
        '中断优先级由 NVIC 管理，DMA 在外设和内存之间搬运数据，不占用 CPU',
        '低功耗模式（Sleep、Stop、Standby）会关闭时钟和稳压器，唤醒源决定芯片如何恢复运行',
      ],
    },
  },
  {
    slug: 'raspberrypi',
    name: 'Raspberry Pi',
    category: 'Embedded',
    tagline: 'Low-cost single-board computers running Linux, plus the RP2040 and RP2350 microcontrollers.',
    understanding: [
      'A Raspberry Pi board carries an Arm system-on-chip from Broadcom, RAM, USB, Ethernet, Wi-Fi and HDMI, and runs a full operating system, usually Raspberry Pi OS, a Debian derivative. The 40-pin header exposes GPIO along with I2C, SPI, UART and PWM, so the board can read sensors and drive hardware directly.',
      'Its uses range from teaching and home servers to prototypes and industrial controllers; the Compute Module puts the same chip on a board meant to be built into products. The Raspberry Pi Pico line is a separate product: a microcontroller board based on the RP2040 or RP2350, programmed in C/C++ with the Pico SDK or in MicroPython.',
    ],
    points: [
      'Under Linux, GPIO is accessed through the kernel\'s character-device interface, from Python with libraries such as gpiozero',
      'Linux is not a real-time system; tight timing is handed to hardware peripherals, a Pico or a separate microcontroller',
      'Running from an SD card wears it out over time; heavy logging and databases are better placed on USB or NVMe storage',
    ],
    zh: {
      tagline: '运行 Linux 的低成本单板计算机，以及 RP2040、RP2350 微控制器。',
      understanding: [
        '树莓派板卡上有一颗博通的 Arm 片上系统、内存、USB、以太网、Wi-Fi 和 HDMI，运行完整的操作系统，通常是基于 Debian 的 Raspberry Pi OS。40 针排针引出 GPIO 以及 I2C、SPI、UART、PWM，板子可以直接读取传感器、驱动硬件。',
        '它的用途从教学、家庭服务器到原型和工业控制器都有；Compute Module 把同样的芯片做成用于嵌入产品的核心板。Raspberry Pi Pico 系列则是另一类产品：基于 RP2040 或 RP2350 的微控制器板，用 Pico SDK 以 C/C++ 编程，或者使用 MicroPython。',
      ],
      points: [
        '在 Linux 下，GPIO 通过内核的字符设备接口访问，Python 中可以用 gpiozero 等库',
        'Linux 不是实时系统；严格的时序要交给硬件外设、Pico 或单独的微控制器',
        '长期从 SD 卡运行会磨损卡片；频繁写日志和数据库更适合放在 USB 或 NVMe 存储上',
      ],
    },
  },
  {
    slug: 'python',
    name: 'Python',
    category: 'Server',
    language: true,
    tagline: 'A dynamically typed, interpreted language used widely for scripting, data work and machine learning.',
    understanding: [
      'Python has a large standard library and an ecosystem on PyPI that covers web frameworks, automation, scientific computing and machine learning. NumPy, pandas and PyTorch do their heavy work in compiled C, C++ or CUDA code and expose it through Python APIs.',
      'CPython, the reference interpreter, has a global interpreter lock that lets one thread execute Python bytecode at a time. I/O-bound work scales with threads or `asyncio`; CPU-bound work uses multiprocessing or native extensions. Python 3.13 added an experimental build without the GIL.',
    ],
    points: [
      'Type hints are checked by tools such as mypy and pyright and are ignored by the interpreter',
      '`uv` and Poetry manage virtual environments and lock files; a lock file makes installs reproducible',
      '`asyncio` runs coroutines on a single-threaded event loop and suits network-heavy services',
    ],
    zh: {
      tagline: '一门动态类型的解释型语言，广泛用于脚本、数据处理和机器学习。',
      understanding: [
        'Python 拥有庞大的标准库，PyPI 上的生态覆盖 Web 框架、自动化、科学计算和机器学习。NumPy、pandas、PyTorch 的重计算在编译好的 C、C++ 或 CUDA 代码中完成，再通过 Python API 暴露出来。',
        '参考解释器 CPython 有全局解释器锁，同一时刻只有一个线程执行 Python 字节码。I/O 密集的工作可以用线程或 `asyncio` 扩展；CPU 密集的工作使用多进程或原生扩展。Python 3.13 加入了实验性的无 GIL 构建。',
      ],
      points: [
        '类型提示由 mypy、pyright 等工具检查，解释器本身会忽略它们',
        '`uv` 和 Poetry 管理虚拟环境和锁文件；锁文件让安装结果可复现',
        '`asyncio` 在单线程事件循环上运行协程，适合网络密集型服务',
      ],
    },
  },
  {
    slug: 'postgresql',
    name: 'PostgreSQL',
    category: 'Data',
    tagline: 'An open-source relational database with strong SQL support and a large extension ecosystem.',
    understanding: [
      'PostgreSQL implements multi-version concurrency control: an update writes a new row version, readers see a consistent snapshot without taking locks, and VACUUM later reclaims the old versions. It supports transactions, foreign keys, window functions, CTEs, JSONB and full-text search.',
      'Extensions add capabilities inside the database: PostGIS for geospatial data, pgvector for vector search, TimescaleDB for time series. Replication is available as streaming physical replication and as logical replication of selected tables.',
    ],
    points: [
      '`EXPLAIN (ANALYZE, BUFFERS)` shows the executed plan with actual row counts, timings and buffer reads',
      'Autovacuum removes dead row versions and prevents transaction ID wraparound; long-running transactions delay both',
      'Connections are processes, so deployments with many clients usually put a pooler such as PgBouncer in front',
    ],
    zh: {
      tagline: '一款开源关系型数据库，SQL 支持完善，扩展生态丰富。',
      understanding: [
        'PostgreSQL 实现了多版本并发控制：更新会写入新的行版本，读操作不加锁就能看到一致的快照，旧版本稍后由 VACUUM 回收。它支持事务、外键、窗口函数、CTE、JSONB 和全文检索。',
        '扩展可以在数据库内部增加能力：PostGIS 处理地理数据，pgvector 做向量检索，TimescaleDB 处理时序数据。复制分为流式物理复制和按表进行的逻辑复制。',
      ],
      points: [
        '`EXPLAIN (ANALYZE, BUFFERS)` 展示实际执行的计划，包括真实行数、耗时和缓冲区读取',
        'autovacuum 清理失效的行版本，并防止事务 ID 回卷；长事务会同时拖慢这两件事',
        '每个连接是一个进程，因此客户端多的部署通常会在前面放一个 PgBouncer 之类的连接池',
      ],
    },
  },
  {
    slug: 'redis',
    name: 'Redis',
    category: 'Data',
    tagline: 'An in-memory data store used as a cache, message broker and fast key-value database.',
    understanding: [
      'Redis keeps its data in memory and executes commands on a single main thread, so each command is atomic. It provides strings, hashes, lists, sets, sorted sets, streams and bitmaps, each with its own commands; Lua scripts and transactions group several commands together.',
      'Persistence is optional, through RDB snapshots, an append-only file, or both. Replication and Sentinel provide failover, and Redis Cluster shards keys across nodes by hash slot. Since the 2024 licence change, Valkey continues the project under the BSD licence.',
    ],
    points: [
      'Commands that scan large collections, such as `KEYS` or `SMEMBERS` on a big set, block the main thread while they run',
      'Common cache problems are penetration (requests for missing keys), stampede (many rebuilds of one expired key) and avalanche (many keys expiring at once)',
      '`maxmemory` and the eviction policy decide what is removed when memory runs out',
    ],
    zh: {
      tagline: '一款内存数据存储，用作缓存、消息代理和高速键值数据库。',
      understanding: [
        'Redis 把数据放在内存中，在单个主线程上执行命令，因此每条命令都是原子的。它提供字符串、哈希、列表、集合、有序集合、流和位图，各有对应的命令；Lua 脚本和事务可以把多条命令组合在一起。',
        '持久化是可选的，可以用 RDB 快照、AOF 日志，或两者同时使用。主从复制和 Sentinel 提供故障切换，Redis Cluster 按哈希槽把键分布到多个节点。2024 年许可证变更后，Valkey 以 BSD 许可证延续了这个项目。',
      ],
      points: [
        '扫描大集合的命令，比如 `KEYS`、对大集合执行 `SMEMBERS`，运行期间会阻塞主线程',
        '常见的缓存问题有穿透（请求不存在的键）、击穿（同一个过期键被大量重建）和雪崩（大量键同时过期）',
        '`maxmemory` 和淘汰策略决定内存用满时删除哪些数据',
      ],
    },
  },
  {
    slug: 'mysql',
    name: 'MySQL',
    category: 'Data',
    tagline: 'A widely deployed open-source relational database, usually run with the InnoDB storage engine.',
    understanding: [
      'InnoDB stores each table as a clustered index on the primary key; secondary indexes store the primary key and look the row up through it. It supports transactions and row-level locking, and implements MVCC by building older row versions from the undo log.',
      'MySQL is common in web applications and is the base of managed services such as Amazon Aurora and PlanetScale. Replication works from the binary log, either asynchronously, semi-synchronously, or through Group Replication.',
    ],
    points: [
      'A short, monotonically increasing primary key keeps inserts at the end of the clustered index and keeps secondary indexes small',
      'Under REPEATABLE READ, InnoDB takes gap and next-key locks on ranges, which can block inserts into those ranges',
      '`EXPLAIN` and the slow query log show which queries scan large numbers of rows',
    ],
    zh: {
      tagline: '一款部署广泛的开源关系型数据库，通常搭配 InnoDB 存储引擎使用。',
      understanding: [
        'InnoDB 把每张表存成以主键为键的聚簇索引；二级索引存储主键，再通过主键回表查找整行。它支持事务和行级锁，通过 undo log 构造旧的行版本来实现 MVCC。',
        'MySQL 在 Web 应用中很常见，也是 Amazon Aurora、PlanetScale 等托管服务的基础。复制基于 binlog，可以是异步复制、半同步复制，或者使用 Group Replication。',
      ],
      points: [
        '短小且单调递增的主键让插入落在聚簇索引的末尾，也让二级索引更小',
        '在 REPEATABLE READ 隔离级别下，InnoDB 会对范围加间隙锁和 next-key 锁，可能阻塞对这些范围的插入',
        '`EXPLAIN` 和慢查询日志可以找出扫描大量行的查询',
      ],
    },
  },
  {
    slug: 'clickhouse',
    name: 'ClickHouse',
    category: 'Data',
    tagline: 'A column-oriented database for analytical queries over very large tables.',
    understanding: [
      'ClickHouse stores each column separately and compresses it, so a query reads only the columns it uses. Its vectorised execution engine processes data in blocks and parallelises a query across CPU cores and across shards.',
      'The MergeTree engine family sorts data by the table\'s ORDER BY key, writes inserts as parts and merges them in the background. Variants such as ReplacingMergeTree and AggregatingMergeTree deduplicate or pre-aggregate rows during those merges. It is used for logs, metrics, event analytics and observability backends.',
    ],
    points: [
      'The ORDER BY key determines the sparse primary index, so filters on its leading columns skip the most data',
      'Inserts work best in large batches; many small inserts create many parts and increase merge load',
      'Updates and deletes run as asynchronous mutations that rewrite whole parts',
    ],
    zh: {
      tagline: '一款列式数据库，用于对超大表做分析查询。',
      understanding: [
        'ClickHouse 把每一列单独存储并压缩，查询只读取用到的列。它的向量化执行引擎按数据块处理，并把一次查询并行分配到多个 CPU 核心和多个分片上。',
        'MergeTree 系列引擎按表的 ORDER BY 键排序数据，插入以 part 的形式写入，再在后台合并。ReplacingMergeTree、AggregatingMergeTree 等变体在合并时去重或预聚合。它常用于日志、指标、事件分析和可观测性后端。',
      ],
      points: [
        'ORDER BY 键决定了稀疏主索引，对前导列做过滤能跳过最多的数据',
        '插入最好大批量进行；大量小批量插入会产生很多 part，加重合并负担',
        '更新和删除以异步 mutation 的方式执行，会重写整个 part',
      ],
    },
  },
  {
    slug: 'sqlite',
    name: 'SQLite',
    category: 'Data',
    tagline: 'An embedded SQL database that stores a whole database in a single file.',
    understanding: [
      'SQLite is a C library linked into the application, with no separate server process. The database is one cross-platform file, and transactions are atomic and durable. It ships in every major operating system, browser and phone, and is one of the most widely deployed pieces of software.',
      'In WAL mode, readers and a single writer can work at the same time, and writes are serialised. Tools such as Litestream and LiteFS replicate the file for backup or for read replicas. It is used for application storage, local caches, test databases and small to medium websites.',
    ],
    points: [
      'Only one write transaction runs at a time; `busy_timeout` sets how long another writer waits for the lock before returning "database is locked"',
      'WAL mode is enabled with `PRAGMA journal_mode=WAL` and is the usual setting for concurrent access',
      'Columns use type affinity by default; `STRICT` tables enforce declared column types',
    ],
    zh: {
      tagline: '一款嵌入式 SQL 数据库，把整个数据库存放在单个文件中。',
      understanding: [
        'SQLite 是一个链接进应用的 C 库，没有独立的服务器进程。数据库是一个跨平台的文件，事务具有原子性和持久性。所有主流操作系统、浏览器和手机都内置了它，是部署最广泛的软件之一。',
        '在 WAL 模式下，读操作和单个写操作可以同时进行，写操作串行执行。Litestream、LiteFS 等工具可以复制这个文件，用于备份或只读副本。它常用于应用存储、本地缓存、测试数据库和中小型网站。',
      ],
      points: [
        '同一时刻只有一个写事务；`busy_timeout` 设置其他写操作在返回 "database is locked" 之前等待锁的时长',
        '用 `PRAGMA journal_mode=WAL` 开启 WAL 模式，这是需要并发访问时的常用设置',
        '列默认使用类型亲和性；`STRICT` 表会强制检查声明的列类型',
      ],
    },
  },
  {
    slug: 'apachekafka',
    name: 'Kafka',
    category: 'Infrastructure',
    tagline: 'A distributed, partitioned log for streaming events between systems.',
    understanding: [
      'Kafka stores messages in topics, each split into partitions. A partition is an append-only log replicated across brokers; consumers track their own offset in it and can re-read from any point while the data is retained. Ordering is guaranteed within a partition.',
      'Consumer groups spread a topic\'s partitions across instances, so throughput scales with the partition count. Kafka is used for event pipelines, change data capture, log aggregation and decoupling services. Since version 4.0 it runs without ZooKeeper, using its own KRaft consensus.',
    ],
    points: [
      'Messages with the same key go to the same partition, which keeps per-key ordering',
      'With `acks=all` and `min.insync.replicas`, a write is acknowledged only after enough replicas have it',
      'Delivery is at-least-once by default; exactly-once processing uses idempotent producers and transactions',
    ],
    zh: {
      tagline: '一个分布式、分区的日志系统，用于在系统之间传输事件流。',
      understanding: [
        'Kafka 把消息存放在 topic 中，每个 topic 分为多个分区。分区是一个只追加的日志，在多个 broker 之间复制；消费者自己记录在分区中的 offset，数据保留期内可以从任意位置重新读取。消息顺序在单个分区内得到保证。',
        '消费者组把一个 topic 的分区分配给多个实例，吞吐量随分区数扩展。Kafka 用于事件管道、变更数据捕获、日志汇聚和服务解耦。从 4.0 版本起，它不再依赖 ZooKeeper，使用自带的 KRaft 共识协议。',
      ],
      points: [
        '相同 key 的消息进入同一个分区，因此同一 key 的消息保持有序',
        '配置 `acks=all` 和 `min.insync.replicas` 后，写入要等足够多的副本收到才会确认',
        '默认投递语义是至少一次；精确一次处理需要幂等生产者和事务',
      ],
    },
  },
  {
    slug: 'docker',
    name: 'Docker',
    category: 'Infrastructure',
    tagline: 'A tool for building and running applications in containers from layered images.',
    understanding: [
      'A container is an ordinary process on the host kernel, isolated with Linux namespaces (process IDs, network, mounts, users) and limited with cgroups (CPU, memory, I/O). An image is a stack of read-only filesystem layers plus metadata, built from a Dockerfile and stored in a registry.',
      'Docker packages an application with its dependencies so it runs the same way on a laptop, in CI and in production. Images follow the OCI specification, so they also run under containerd, Podman and Kubernetes. Docker Compose describes multi-container setups in one file.',
    ],
    points: [
      'Each Dockerfile instruction creates a layer, and unchanged layers are reused from the build cache',
      'Multi-stage builds compile in one stage and copy only the output into a smaller runtime image',
      'Containers share the host kernel; running as a non-root user and dropping capabilities reduce what a compromised process can do',
    ],
    zh: {
      tagline: '一个用分层镜像构建并在容器中运行应用的工具。',
      understanding: [
        '容器是宿主机内核上的一个普通进程，用 Linux namespace（进程 ID、网络、挂载、用户）隔离，用 cgroup（CPU、内存、I/O）限制资源。镜像是一组只读文件系统层加上元数据，由 Dockerfile 构建，存放在镜像仓库中。',
        'Docker 把应用和它的依赖打包在一起，使它在笔记本、CI 和生产环境中以相同的方式运行。镜像遵循 OCI 规范，因此也能在 containerd、Podman 和 Kubernetes 下运行。Docker Compose 用一个文件描述多容器的部署。',
      ],
      points: [
        'Dockerfile 的每条指令生成一层，未变化的层会从构建缓存中复用',
        '多阶段构建在一个阶段编译，只把产物复制到更小的运行镜像里',
        '容器共享宿主机内核；以非 root 用户运行、去掉多余的 capability，可以减小进程被攻破后的影响范围',
      ],
    },
  },
  {
    slug: 'kubernetes',
    name: 'Kubernetes',
    category: 'Infrastructure',
    tagline: 'A container orchestrator that keeps a cluster in the state described by its configuration.',
    understanding: [
      'Kubernetes stores the desired state of the cluster as API objects (Deployments, Services, ConfigMaps and so on) in etcd. Controllers watch those objects and act until the actual state matches: the scheduler places Pods on nodes, the kubelet starts their containers, and Deployments replace failed Pods.',
      'It provides service discovery, load balancing, rolling updates, autoscaling and storage attachment through a common API. Managed offerings such as EKS, GKE and AKS run the control plane, and Helm and Kustomize package and template the manifests.',
    ],
    points: [
      'Resource requests guide scheduling and limits cap usage; a container that exceeds its memory limit is OOM-killed',
      'Readiness probes control whether a Pod receives traffic, and liveness probes restart a container that has stopped responding',
      'A PodDisruptionBudget limits how many replicas voluntary disruptions, such as node drains, can take down at once',
    ],
    zh: {
      tagline: '一个容器编排系统，让集群保持配置所描述的状态。',
      understanding: [
        'Kubernetes 把集群的期望状态以 API 对象（Deployment、Service、ConfigMap 等）的形式存放在 etcd 中。控制器监听这些对象并持续操作，直到实际状态与之一致：调度器把 Pod 分配到节点，kubelet 启动其中的容器，Deployment 替换失败的 Pod。',
        '它通过统一的 API 提供服务发现、负载均衡、滚动更新、自动扩缩容和存储挂载。EKS、GKE、AKS 等托管服务负责运行控制平面，Helm 和 Kustomize 用于打包和模板化清单文件。',
      ],
      points: [
        'requests 用于调度，limits 限制用量；容器超出内存 limit 会被 OOM kill',
        'readiness 探针决定 Pod 是否接收流量，liveness 探针会重启已经无响应的容器',
        'PodDisruptionBudget 限制节点排空等主动中断一次能停掉多少副本',
      ],
    },
  },
  {
    slug: 'linux',
    name: 'Linux',
    category: 'Infrastructure',
    tagline: 'The open-source kernel that runs most servers, containers and cloud infrastructure.',
    understanding: [
      'The Linux kernel manages processes, memory, filesystems, networking and devices, and exposes them through system calls and the `/proc` and `/sys` filesystems. Namespaces and cgroups, the building blocks of containers, are kernel features.',
      'Distributions such as Debian, Ubuntu, RHEL and Alpine package the kernel with a userland and a package manager. Tools such as `top`, `vmstat`, `iostat`, `ss`, `strace` and `perf` show what the system and individual processes are doing.',
    ],
    points: [
      'Load average counts runnable tasks and tasks in uninterruptible sleep, so heavy disk I/O raises it as well as CPU use',
      'Free memory is used as page cache; the `available` column in `free` shows what can be reclaimed for applications',
      'eBPF runs sandboxed programs in the kernel for tracing, networking and security, with tools such as bpftrace and the BCC suite',
    ],
    zh: {
      tagline: '开源内核，运行着大多数服务器、容器和云基础设施。',
      understanding: [
        'Linux 内核管理进程、内存、文件系统、网络和设备，并通过系统调用以及 `/proc`、`/sys` 文件系统对外暴露。容器的基础组件 namespace 和 cgroup，都是内核特性。',
        'Debian、Ubuntu、RHEL、Alpine 等发行版把内核与用户态工具和包管理器打包在一起。`top`、`vmstat`、`iostat`、`ss`、`strace`、`perf` 等工具可以查看整个系统和单个进程在做什么。',
      ],
      points: [
        'load average 统计可运行的任务和处于不可中断睡眠的任务，因此大量磁盘 I/O 和 CPU 占用都会抬高它',
        '空闲内存会被用作页缓存；`free` 输出中的 `available` 列表示可以回收给应用使用的部分',
        'eBPF 在内核中运行沙箱化的程序，用于追踪、网络和安全，常用工具有 bpftrace 和 BCC',
      ],
    },
  },
  {
    slug: 'nginx',
    name: 'NGINX',
    category: 'Infrastructure',
    tagline: 'A web server and reverse proxy built on an event-driven, non-blocking architecture.',
    understanding: [
      'NGINX runs a master process and a small number of worker processes; each worker handles many connections with an event loop (epoll on Linux, kqueue on BSD). This keeps memory use low and steady as the number of connections grows.',
      'It serves static files, terminates TLS, load-balances across upstream servers, caches responses, and proxies HTTP, gRPC and WebSocket traffic. It is also the basis of ingress controllers in Kubernetes and of OpenResty, which adds Lua scripting.',
    ],
    points: [
      '`worker_processes auto` starts one worker per CPU core',
      '`keepalive` in an upstream block reuses connections to backends and reduces connection setup',
      '`nginx -t` checks the configuration, and `nginx -s reload` applies it without dropping existing connections',
    ],
    zh: {
      tagline: '一款基于事件驱动、非阻塞架构的 Web 服务器和反向代理。',
      understanding: [
        'NGINX 运行一个 master 进程和少量 worker 进程；每个 worker 用事件循环（Linux 上是 epoll，BSD 上是 kqueue）处理大量连接。连接数增长时，内存占用依然低而平稳。',
        '它可以提供静态文件、终结 TLS、在多个上游服务器之间做负载均衡、缓存响应，以及代理 HTTP、gRPC 和 WebSocket 流量。Kubernetes 的 ingress 控制器和加入了 Lua 脚本的 OpenResty 也以它为基础。',
      ],
      points: [
        '`worker_processes auto` 会为每个 CPU 核心启动一个 worker',
        'upstream 块中的 `keepalive` 复用到后端的连接，减少建立连接的开销',
        '`nginx -t` 检查配置，`nginx -s reload` 在不中断现有连接的情况下应用新配置',
      ],
    },
  },
  {
    slug: 'typescript',
    name: 'TypeScript',
    category: 'Client',
    language: true,
    platform: 'Web',
    tagline: 'JavaScript with a static type system, compiled away before the code runs.',
    understanding: [
      'TypeScript adds type annotations, interfaces, generics and union types to JavaScript. The compiler checks them and emits plain JavaScript; the types do not exist at run time. Its type system is structural: two types are compatible when their shapes match.',
      'It is the default for most large front-end and Node.js codebases, and editors use its language service for completion, navigation and refactoring. Type definitions for untyped libraries are published on DefinitelyTyped under `@types/*`.',
    ],
    points: [
      '`strict` mode enables null checks and stricter inference, and is the usual setting for new projects',
      'Discriminated unions with a literal `kind` field let the compiler narrow types inside `switch` and `if` branches',
      'Data from the network or user input is unchecked at run time; libraries such as zod validate it and derive the static type from the schema',
    ],
    zh: {
      tagline: '带静态类型系统的 JavaScript，类型在代码运行之前就被编译掉。',
      understanding: [
        'TypeScript 为 JavaScript 加入了类型标注、接口、泛型和联合类型。编译器检查这些类型并输出普通的 JavaScript；运行时不存在类型。它的类型系统是结构化的：两个类型的形状一致即可兼容。',
        '它是大多数大型前端和 Node.js 项目的默认选择，编辑器借助它的语言服务实现补全、跳转和重构。没有类型的库，其类型定义发布在 DefinitelyTyped 的 `@types/*` 下。',
      ],
      points: [
        '`strict` 模式会开启空值检查和更严格的推断，新项目通常默认开启',
        '带字面量 `kind` 字段的可辨识联合，让编译器能在 `switch` 和 `if` 分支中收窄类型',
        '来自网络或用户输入的数据在运行时没有检查；zod 等库负责校验，并从 schema 推导出静态类型',
      ],
    },
  },
  {
    slug: 'react',
    name: 'React',
    category: 'Client',
    platform: 'Web',
    tagline: 'A JavaScript library for building user interfaces from components.',
    understanding: [
      'A React component is a function that takes props and state and returns a description of the UI. When state changes, React re-renders the affected components and applies the differences to the DOM. Hooks such as `useState`, `useEffect` and `useContext` give function components state and side effects.',
      'React handles the view layer; routing, data fetching and server rendering come from frameworks such as Next.js and React Router or from separate libraries. React 18 added concurrent rendering, and React 19 added Server Components and Actions. React Native applies the same model to iOS and Android.',
    ],
    points: [
      '`key` identifies list items between renders; stable IDs keep each item\'s state attached to the right element',
      '`useMemo` and `useCallback` keep values and functions referentially stable between renders',
      'Libraries such as TanStack Query cache server data and handle refetching and invalidation',
    ],
    zh: {
      tagline: '一个用组件构建用户界面的 JavaScript 库。',
      understanding: [
        'React 组件是一个函数，接收 props 和 state，返回对界面的描述。state 变化时，React 重新渲染受影响的组件，并把差异应用到 DOM 上。`useState`、`useEffect`、`useContext` 等 Hook 为函数组件提供状态和副作用。',
        'React 负责视图层；路由、数据获取和服务端渲染由 Next.js、React Router 等框架或独立的库提供。React 18 加入了并发渲染，React 19 加入了 Server Components 和 Actions。React Native 把同一套模型用于 iOS 和 Android。',
      ],
      points: [
        '`key` 用于在多次渲染之间识别列表项；稳定的 ID 让每一项的状态始终对应正确的元素',
        '`useMemo` 和 `useCallback` 让值和函数在多次渲染之间保持引用稳定',
        'TanStack Query 等库负责缓存服务端数据，并处理重新获取和失效',
      ],
    },
  },
  {
    slug: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'Client',
    platform: 'Web',
    tagline: 'A utility-first CSS framework that styles elements with small, single-purpose classes.',
    understanding: [
      'Tailwind provides classes such as `flex`, `px-4` and `text-sm`, each setting one or a few CSS properties from a design scale. Styles are written in the markup, and the build scans the source files and generates CSS only for the classes in use.',
      'Version 4 moved configuration into CSS: design tokens are declared with `@theme`, and custom utilities with `@utility`. Variants such as `hover:`, `md:` and `dark:` apply a class under a state or breakpoint. This site uses Tailwind v4 for layout, with its tokens and newspaper styles in one stylesheet.',
    ],
    points: [
      'Spacing, colour and type scales come from the theme, so values stay consistent across components',
      'In v4, `@apply` accepts classes declared with `@utility`; classes inside `@layer components` are unavailable to it',
      'Repeated groups of utilities are usually extracted into a component in the UI framework',
    ],
    zh: {
      tagline: '一个原子化优先的 CSS 框架，用小而单一用途的类来设置样式。',
      understanding: [
        'Tailwind 提供 `flex`、`px-4`、`text-sm` 这样的类，每个类按设计尺度设置一个或几个 CSS 属性。样式直接写在标记里，构建时扫描源文件，只为用到的类生成 CSS。',
        'v4 把配置搬进了 CSS：设计 token 用 `@theme` 声明，自定义工具类用 `@utility` 声明。`hover:`、`md:`、`dark:` 等变体让类在特定状态或断点下生效。这个网站用 Tailwind v4 做布局，token 和报纸版式样式放在一个样式表里。',
      ],
      points: [
        '间距、颜色和字号尺度来自主题，各个组件的取值因此保持一致',
        'v4 中 `@apply` 接受用 `@utility` 声明的类；`@layer components` 里的类不能用于 `@apply`',
        '反复出现的一组工具类，通常会在 UI 框架里抽成一个组件',
      ],
    },
  },
  {
    slug: 'vite',
    name: 'Vite',
    category: 'Client',
    platform: 'Web',
    tagline: 'A front-end build tool with a fast dev server based on native ES modules.',
    understanding: [
      'In development, Vite serves source files to the browser as native ES modules and transforms each file when it is requested, with hot module replacement on save. Dependencies are pre-bundled once with esbuild. For production it bundles the application with Rollup, and newer versions with Rolldown.',
      'It supports TypeScript, JSX, CSS modules and static assets without extra configuration, and its plugin API is compatible with Rollup plugins. Astro, SvelteKit, Nuxt, SolidStart and many React setups are built on it.',
    ],
    points: [
      'Development and production builds go through different pipelines, so the production build is worth testing before release',
      '`import.meta.env` exposes environment variables, and only those prefixed with `VITE_` reach client code',
      '`vite preview` serves the production build locally',
    ],
    zh: {
      tagline: '一个前端构建工具，开发服务器基于原生 ES 模块，启动迅速。',
      understanding: [
        '开发时，Vite 把源文件作为原生 ES 模块交给浏览器，文件被请求时才进行转换，保存后通过热模块替换更新。依赖会用 esbuild 预打包一次。生产构建使用 Rollup 打包，新版本使用 Rolldown。',
        '它无需额外配置即可支持 TypeScript、JSX、CSS Modules 和静态资源，插件 API 与 Rollup 插件兼容。Astro、SvelteKit、Nuxt、SolidStart 和很多 React 项目都构建在它之上。',
      ],
      points: [
        '开发和生产构建走的是不同的流水线，发布前应测试生产构建',
        '`import.meta.env` 提供环境变量，只有以 `VITE_` 开头的变量会进入客户端代码',
        '`vite preview` 在本地提供生产构建的预览',
      ],
    },
  },
  {
    slug: 'bun',
    name: 'Bun',
    category: 'Client',
    platform: 'Web',
    tagline: 'A JavaScript runtime, package manager, bundler and test runner in one binary, built on JavaScriptCore.',
    understanding: [
      'Bun runs JavaScript and TypeScript outside the browser on JavaScriptCore, the engine from WebKit, and is written mostly in Zig. TypeScript and JSX files run directly, with no separate compile step, and ES modules and CommonJS can be mixed in the same project.',
      'It aims to be a drop-in replacement for Node.js: it implements most of the Node APIs and reads `package.json` and `node_modules` the same way. The same binary also installs packages (`bun install`, with a `bun.lock` lockfile), bundles code (`bun build`) and runs Jest-compatible tests (`bun test`). It also ships built-in APIs such as `Bun.serve` for HTTP and `bun:sqlite`.',
    ],
    points: [
      '`bun install` uses a global cache and links packages into `node_modules`, which makes installs considerably faster than npm',
      '`bun --bun <script>` forces tools whose shebang names `node` to run on Bun instead',
      'The `packageManager` field in `package.json` records the Bun version a project expects',
    ],
    zh: {
      tagline: '集 JavaScript 运行时、包管理器、打包器和测试运行器于一个二进制文件，基于 JavaScriptCore。',
      understanding: [
        'Bun 借助 WebKit 的 JavaScriptCore 引擎在浏览器之外运行 JavaScript 和 TypeScript，主体用 Zig 编写。TypeScript 和 JSX 文件可以直接运行，不需要单独的编译步骤，同一个项目里可以混用 ES 模块和 CommonJS。',
        '它的目标是直接替换 Node.js：实现了大部分 Node API，读取 `package.json` 和 `node_modules` 的方式也相同。同一个二进制文件还负责安装依赖（`bun install`，锁文件为 `bun.lock`）、打包（`bun build`）和运行兼容 Jest 的测试（`bun test`）。它还内置了 `Bun.serve`（HTTP）和 `bun:sqlite` 等 API。',
      ],
      points: [
        '`bun install` 使用全局缓存并把包链接进 `node_modules`，安装速度明显快于 npm',
        '`bun --bun <script>` 让 shebang 写着 `node` 的工具改由 Bun 运行',
        '`package.json` 中的 `packageManager` 字段记录项目需要的 Bun 版本',
      ],
    },
  },
  {
    slug: 'swift',
    name: 'Swift',
    category: 'Client',
    language: true,
    platform: 'Apple',
    tagline: "Apple's compiled language for iOS, macOS and the other Apple platforms.",
    understanding: [
      'Swift uses optionals to mark values that may be absent, value types (structs and enums) with copy semantics, and automatic reference counting for classes. Protocols with default implementations play the role that inheritance plays in many other languages.',
      'Swift 5.5 added async/await and actors, and Swift 6 checks for data races at compile time under strict concurrency. Swift is open source and also runs on Linux and Windows, though most of its use is on Apple platforms with SwiftUI and UIKit.',
    ],
    points: [
      'Structs and enums are copied on assignment; classes are shared by reference and counted with ARC',
      '`guard let` and `if let` unwrap optionals safely; force-unwrapping with `!` traps at run time when the value is nil',
      'Actors serialise access to their state, and `Sendable` marks types that can cross concurrency domains',
    ],
    zh: {
      tagline: 'Apple 为 iOS、macOS 等自家平台推出的编译型语言。',
      understanding: [
        'Swift 用 Optional 标记可能缺失的值，struct 和 enum 等值类型采用复制语义，class 使用自动引用计数。带默认实现的协议，承担了许多其他语言中继承所承担的角色。',
        'Swift 5.5 加入了 async/await 和 actor，Swift 6 在严格并发模式下于编译期检查数据竞争。Swift 是开源的，也能在 Linux 和 Windows 上运行，但主要用于 Apple 平台，配合 SwiftUI 和 UIKit。',
      ],
      points: [
        'struct 和 enum 在赋值时复制；class 按引用共享，由 ARC 计数',
        '`guard let` 和 `if let` 安全地解包 Optional；用 `!` 强制解包时，若值为 nil 会在运行时崩溃',
        'actor 串行化对自身状态的访问，`Sendable` 标记可以跨并发域传递的类型',
      ],
    },
  },
  {
    slug: 'swiftui',
    name: 'SwiftUI',
    category: 'Client',
    platform: 'Apple',
    tagline: "Apple's declarative UI framework for building interfaces in Swift across its platforms.",
    understanding: [
      'A SwiftUI view is a struct whose `body` describes the interface for the current state. When state changes, SwiftUI recomputes the affected views and updates the screen. One codebase can target iOS, iPadOS, macOS, watchOS, tvOS and visionOS.',
      'State is held with property wrappers such as `@State` and `@Binding`, and since iOS 17 with `@Observable` model classes. SwiftUI interoperates with UIKit and AppKit through `UIViewRepresentable` and hosting controllers. Xcode previews render views while they are being edited.',
    ],
    points: [
      '`@State` holds state owned by one view, and `@Observable` models hold state shared between views',
      'Many APIs depend on the minimum OS version, which is listed in the documentation for each modifier',
      '`UIViewRepresentable` and `UIHostingController` embed UIKit views in SwiftUI and SwiftUI views in UIKit',
    ],
    zh: {
      tagline: 'Apple 的声明式 UI 框架，用 Swift 为其各个平台构建界面。',
      understanding: [
        'SwiftUI 的视图是一个 struct，它的 `body` 描述当前状态下的界面。状态变化时，SwiftUI 重新计算受影响的视图并更新屏幕。同一套代码可以面向 iOS、iPadOS、macOS、watchOS、tvOS 和 visionOS。',
        '状态通过 `@State`、`@Binding` 等属性包装器保存，iOS 17 起还可以使用 `@Observable` 模型类。SwiftUI 通过 `UIViewRepresentable` 和 hosting controller 与 UIKit、AppKit 互操作。Xcode 预览会在编辑时实时渲染视图。',
      ],
      points: [
        '`@State` 保存单个视图自有的状态，`@Observable` 模型保存多个视图共享的状态',
        '很多 API 依赖最低系统版本，每个修饰符的文档中都标明了版本要求',
        '`UIViewRepresentable` 和 `UIHostingController` 分别用于在 SwiftUI 中嵌入 UIKit 视图、在 UIKit 中嵌入 SwiftUI 视图',
      ],
    },
  },
  {
    slug: 'xcode',
    name: 'Xcode',
    category: 'Client',
    platform: 'Apple',
    tagline: "Apple's IDE for building, testing and shipping apps on its platforms.",
    understanding: [
      'Xcode bundles the editor, the Swift and Clang compilers, the SDKs for iOS, iPadOS, macOS, watchOS, tvOS and visionOS, and the simulators for each. Projects are organised into targets and schemes, and build settings decide how each target is compiled, signed and packaged.',
      'It includes Interface Builder and SwiftUI previews for laying out views, the LLDB debugger, XCTest and Swift Testing for unit and UI tests, and Instruments for profiling CPU, memory, energy and rendering. Apps are archived and uploaded to App Store Connect from the Organizer; it runs only on macOS.',
    ],
    points: [
      'Code signing ties a build to a team, a certificate and a provisioning profile; automatic signing manages these for most projects',
      'Swift Package Manager is built in, and packages are added to a project from their repository URL',
      '`xcodebuild` runs builds and tests from the command line, which is how CI services drive Xcode',
    ],
    zh: {
      tagline: 'Apple 的 IDE，用于在其各个平台上构建、测试和发布应用。',
      understanding: [
        'Xcode 集成了编辑器、Swift 和 Clang 编译器、iOS、iPadOS、macOS、watchOS、tvOS、visionOS 的 SDK 以及各平台的模拟器。项目由 target 和 scheme 组织，构建设置决定每个 target 如何编译、签名和打包。',
        '它包含用于布局界面的 Interface Builder 和 SwiftUI 预览、LLDB 调试器、用于单元测试和 UI 测试的 XCTest 与 Swift Testing，以及分析 CPU、内存、能耗和渲染的 Instruments。应用在 Organizer 中归档并上传到 App Store Connect；它只能在 macOS 上运行。',
      ],
      points: [
        '代码签名把一次构建与开发团队、证书和描述文件绑定在一起；大多数项目可以交给自动签名管理',
        '内置 Swift Package Manager，通过仓库 URL 即可把包加入项目',
        '`xcodebuild` 在命令行中执行构建和测试，CI 服务就是通过它来驱动 Xcode 的',
      ],
    },
  },
  {
    slug: 'kotlin',
    name: 'Kotlin',
    category: 'Client',
    language: true,
    platform: 'Android',
    tagline: 'A JVM language from JetBrains, the preferred language for Android development.',
    understanding: [
      'Kotlin runs on the JVM and interoperates fully with Java libraries. Its type system distinguishes nullable from non-null types, and it adds data classes, extension functions, smart casts and sealed classes. Google has listed it as the preferred language for Android since 2019.',
      'Coroutines provide asynchronous code written in sequential style, with structured concurrency tying each coroutine to a scope. Kotlin also compiles to JavaScript and native code, and Kotlin Multiplatform shares code between Android, iOS, desktop and server.',
    ],
    points: [
      'Values coming from Java have platform types (`String!`) whose nullability the compiler does not know',
      'Coroutines launched in a lifecycle-bound scope, such as `viewModelScope`, are cancelled when that scope ends',
      '`val` declares a read-only reference and `var` a mutable one; collections come in read-only and mutable interfaces',
    ],
    zh: {
      tagline: 'JetBrains 推出的 JVM 语言，Android 开发的首选语言。',
      understanding: [
        'Kotlin 运行在 JVM 上，可以与 Java 类库完全互操作。它的类型系统区分可空类型和非空类型，并提供 data class、扩展函数、智能类型转换和 sealed class。自 2019 年起，Google 将它列为 Android 开发的首选语言。',
        '协程让异步代码可以按顺序风格书写，结构化并发把每个协程绑定到一个 scope。Kotlin 也能编译为 JavaScript 和本地代码，Kotlin Multiplatform 可在 Android、iOS、桌面和服务端之间共享代码。',
      ],
      points: [
        '来自 Java 的值带有平台类型（`String!`），编译器不知道它们是否可空',
        '在绑定生命周期的 scope（如 `viewModelScope`）中启动的协程，会在该 scope 结束时被取消',
        '`val` 声明只读引用，`var` 声明可变引用；集合分为只读接口和可变接口',
      ],
    },
  },
  {
    slug: 'gradle',
    name: 'Gradle',
    category: 'Client',
    platform: 'Android',
    tagline: 'A build tool for the JVM, and the build system behind every Android project.',
    understanding: [
      'Gradle builds are described in scripts, written today mostly in the Kotlin DSL (`build.gradle.kts`). A build is a graph of tasks such as compiling, testing and packaging; Gradle works out the order from their dependencies and skips any task whose inputs and outputs have not changed since the last run.',
      'Plugins add the tasks for a given kind of project. The Android Gradle Plugin turns Kotlin sources and resources into APKs and App Bundles, with build types (debug, release) and product flavours for variants of the same app. Android Studio syncs its project model from the Gradle build.',
    ],
    points: [
      'The Gradle Wrapper (`gradlew`) pins the Gradle version per project, so every machine and CI runner builds with the same one',
      'Version catalogs (`libs.versions.toml`) keep dependency coordinates and versions in one file shared across modules',
      'The build cache and configuration cache reuse earlier task outputs and the configured task graph to shorten repeat builds',
    ],
    zh: {
      tagline: '面向 JVM 的构建工具，也是所有 Android 项目背后的构建系统。',
      understanding: [
        'Gradle 的构建用脚本描述，如今大多使用 Kotlin DSL（`build.gradle.kts`）编写。一次构建是由编译、测试、打包等任务组成的图；Gradle 根据依赖关系确定执行顺序，输入和输出自上次运行以来没有变化的任务会被跳过。',
        '插件为某类项目添加所需的任务。Android Gradle Plugin 把 Kotlin 源码和资源打包成 APK 与 App Bundle，并用构建类型（debug、release）和产品变种区分同一应用的不同版本。Android Studio 的项目模型就是从 Gradle 构建同步而来的。',
      ],
      points: [
        'Gradle Wrapper（`gradlew`）为每个项目固定 Gradle 版本，所有机器和 CI 都用同一个版本构建',
        '版本目录（`libs.versions.toml`）把依赖坐标和版本集中在一个文件里，供各模块共享',
        '构建缓存和配置缓存复用之前的任务输出与已配置好的任务图，缩短重复构建的时间',
      ],
    },
  },
  {
    slug: 'materialdesign',
    name: 'Material Design 3',
    category: 'Client',
    platform: 'Android',
    tagline: "Google's design system, with components, colour, type and motion guidelines for Android and the web.",
    understanding: [
      'Material Design 3, also called Material You, is the current version of the design system Google introduced in 2014. It specifies a set of components (buttons, app bars, navigation bars, cards, dialogs and so on) together with rules for layout, typography, shape, elevation and motion.',
      'Its colour system derives a full palette of tonal roles, such as primary, secondary, surface and their "on" counterparts, from a single source colour. On Android 12 and later, dynamic colour can take that source from the user\'s wallpaper. Compose implements it in the `androidx.compose.material3` library, and there are implementations for Android Views, Flutter and the web.',
    ],
    points: [
      'A `MaterialTheme` supplies the colour scheme, typography and shapes that every Material component in the tree reads',
      'Colour roles come in pairs, such as `primary` and `onPrimary`, so text and icons keep their contrast against the surface beneath',
      'The Material Theme Builder generates light and dark colour schemes from a source colour and exports them as code',
    ],
    zh: {
      tagline: 'Google 的设计系统，为 Android 和 Web 提供组件，以及颜色、字体和动效规范。',
      understanding: [
        'Material Design 3 又称 Material You，是 Google 在 2014 年推出的设计系统的当前版本。它规定了一套组件（按钮、顶部应用栏、导航栏、卡片、对话框等），以及布局、字体、形状、层级和动效的规则。',
        '它的颜色系统从单一的源颜色推导出整套色调角色，例如 primary、secondary、surface 以及对应的 “on” 色。在 Android 12 及以上版本，动态取色可以从用户的壁纸中提取这个源颜色。Compose 在 `androidx.compose.material3` 库中实现了它，Android View、Flutter 和 Web 也各有实现。',
      ],
      points: [
        '`MaterialTheme` 提供颜色方案、字体和形状，树中的每个 Material 组件都从这里读取',
        '颜色角色成对出现，例如 `primary` 与 `onPrimary`，让文字和图标与其下方的表面保持对比度',
        'Material Theme Builder 能从一个源颜色生成浅色和深色两套方案，并导出为代码',
      ],
    },
  },
  {
    slug: 'jetpackcompose',
    name: 'Jetpack Compose',
    category: 'Client',
    platform: 'Android',
    tagline: "Android's declarative UI toolkit, written in Kotlin.",
    understanding: [
      'In Compose, UI is built from composable functions: Kotlin functions marked `@Composable` that describe what the screen shows for the current state. When state they read changes, the runtime re-runs only the affected functions, a process called recomposition, and updates the view tree.',
      'State is held with `remember` and `mutableStateOf`, or comes from a ViewModel as a `StateFlow`. Layout is done with `Row`, `Column`, `Box` and lazy lists, and appearance is adjusted through modifiers. Compose interoperates with the older Android View system in both directions, and Android Studio renders composables in previews.',
    ],
    points: [
      'Composable functions may run often and in any order, so side effects belong in `LaunchedEffect`, `DisposableEffect` and similar APIs',
      'State hoisting moves state up to the caller, which keeps composables stateless and easier to preview and test',
      'Stable parameter types let the runtime skip recomposing functions whose inputs have not changed',
    ],
    zh: {
      tagline: 'Android 的声明式 UI 工具包，用 Kotlin 编写。',
      understanding: [
        'Compose 用可组合函数构建界面：这些是标注了 `@Composable` 的 Kotlin 函数，描述当前状态下屏幕显示什么。它们读取的状态发生变化时，运行时只重新执行受影响的函数（称为重组），并更新视图树。',
        '状态通过 `remember` 和 `mutableStateOf` 保存，或者以 `StateFlow` 的形式来自 ViewModel。布局用 `Row`、`Column`、`Box` 和惰性列表完成，外观通过 modifier 调整。Compose 与旧的 Android View 系统可以双向互通，Android Studio 能在预览中渲染可组合函数。',
      ],
      points: [
        '可组合函数可能频繁执行、执行顺序也不固定，副作用应放进 `LaunchedEffect`、`DisposableEffect` 等 API',
        '状态提升把状态移到调用方，让可组合函数保持无状态，更易于预览和测试',
        '参数类型稳定时，运行时可以跳过输入没有变化的函数，不对它们重组',
      ],
    },
  },
  {
    slug: 'csharp',
    name: 'C#',
    category: 'Client',
    language: true,
    platform: 'Windows',
    tagline: "Microsoft's statically typed, garbage-collected language for .NET.",
    understanding: [
      'C# is an object-oriented language with generics, lambdas, pattern matching and records. It compiles to intermediate language (IL), which the .NET runtime turns into machine code with a just-in-time compiler, or ahead of time with Native AOT.',
      'LINQ provides query operators over collections and other data sources, and `async`/`await` writes asynchronous code in sequential form. Nullable reference types let the compiler warn about possible null dereferences. It is used for Windows desktop apps, web services with ASP.NET Core, games with Unity, and cross-platform apps.',
    ],
    points: [
      'Value types (`struct`) live inline and are copied on assignment; reference types (`class`) live on the managed heap',
      '`Span<T>` and `Memory<T>` work on slices of arrays and buffers without copying or allocating',
      'Source generators produce extra code at compile time, which replaces much of the reflection libraries used to do at run time',
    ],
    zh: {
      tagline: '微软为 .NET 设计的静态类型、带垃圾回收的语言。',
      understanding: [
        'C# 是一门面向对象的语言，支持泛型、lambda、模式匹配和 record。它编译成中间语言（IL），再由 .NET 运行时通过即时编译器转成机器码，或者用 Native AOT 提前编译。',
        'LINQ 为集合和其他数据源提供查询操作，`async`/`await` 让异步代码可以按顺序的写法书写。可空引用类型让编译器对可能的空引用解引用发出警告。它用于 Windows 桌面应用、基于 ASP.NET Core 的 Web 服务、Unity 游戏以及跨平台应用。',
      ],
      points: [
        '值类型（`struct`）内联存放，赋值时复制；引用类型（`class`）存放在托管堆上',
        '`Span<T>` 和 `Memory<T>` 可以直接操作数组和缓冲区的切片，不复制也不分配',
        '源代码生成器在编译期生成额外代码，取代了以往许多库在运行时用反射完成的工作',
      ],
    },
  },
  {
    slug: 'dotnet',
    name: '.NET',
    category: 'Client',
    platform: 'Windows',
    tagline: "Microsoft's open-source, cross-platform runtime and class libraries for C#, F# and Visual Basic.",
    understanding: [
      '.NET consists of a runtime (the CLR), which loads IL, compiles it to machine code and manages memory with a generational garbage collector, and a base class library covering collections, I/O, networking, threading and more. It runs on Windows, Linux and macOS.',
      'Projects are built with the `dotnet` CLI and MSBuild, and packages come from NuGet. A new major version ships every November; even-numbered releases are long-term support. On top of it sit ASP.NET Core for the web and, for Windows desktop, WinForms, WPF and the Windows App SDK.',
    ],
    points: [
      'The target framework (for example `net9.0-windows10.0.19041.0`) in the project file decides which APIs and platforms a build can use',
      'Self-contained publishing bundles the runtime with the app, so the target machine needs no .NET install',
      'Tiered compilation starts methods with a quick JIT pass and recompiles the frequently called ones with full optimisation',
    ],
    zh: {
      tagline: '微软开源、跨平台的运行时和类库，供 C#、F#、Visual Basic 使用。',
      understanding: [
        '.NET 由运行时（CLR）和基础类库组成：CLR 加载 IL、将其编译为机器码，并用分代垃圾回收器管理内存；基础类库覆盖集合、I/O、网络、线程等。它可以运行在 Windows、Linux 和 macOS 上。',
        '项目用 `dotnet` 命令行和 MSBuild 构建，包来自 NuGet。每年 11 月发布一个大版本，偶数版本为长期支持版本。在它之上有面向 Web 的 ASP.NET Core，以及面向 Windows 桌面的 WinForms、WPF 和 Windows App SDK。',
      ],
      points: [
        '项目文件中的目标框架（例如 `net9.0-windows10.0.19041.0`）决定一次构建能使用哪些 API、面向哪些平台',
        '独立发布会把运行时和应用打包在一起，目标机器无需安装 .NET',
        '分层编译先用快速 JIT 编译方法，再对频繁调用的方法以完整优化重新编译',
      ],
    },
  },
  {
    slug: 'winui',
    name: 'WinUI 3',
    category: 'Client',
    platform: 'Windows',
    tagline: 'The native UI framework for Windows desktop apps, shipped in the Windows App SDK.',
    understanding: [
      'WinUI 3 is the current Microsoft UI framework for Windows 10 and 11 desktop apps. Interfaces are declared in XAML with code-behind in C# or C++, and its controls follow the Fluent Design System, including materials such as Mica and Acrylic.',
      'It ships as part of the Windows App SDK, separately from the operating system, so apps get new controls without waiting for a Windows release. Apps can be packaged as MSIX or deployed unpackaged, and it is the UI layer that .NET MAUI uses on Windows.',
    ],
    points: [
      'Data binding with `{x:Bind}` is checked and compiled at build time, unlike the reflection-based `{Binding}`',
      'Pairing with the MVVM pattern, typically through the CommunityToolkit.Mvvm library, keeps view logic out of the XAML code-behind',
      'UI elements must be updated on the UI thread; work from background threads is marshalled back through the `DispatcherQueue`',
    ],
    zh: {
      tagline: 'Windows 桌面应用的原生 UI 框架，随 Windows App SDK 发布。',
      understanding: [
        'WinUI 3 是微软当前用于 Windows 10 和 11 桌面应用的 UI 框架。界面用 XAML 声明，后台代码用 C# 或 C++ 编写，控件遵循 Fluent Design System，包括 Mica、Acrylic 等材质效果。',
        '它作为 Windows App SDK 的一部分，独立于操作系统发布，应用无需等待 Windows 更新就能用上新控件。应用可以打包为 MSIX，也可以不打包部署；.NET MAUI 在 Windows 上的界面层也是它。',
      ],
      points: [
        '`{x:Bind}` 数据绑定在构建时检查并编译，不同于基于反射的 `{Binding}`',
        '配合 MVVM 模式（通常借助 CommunityToolkit.Mvvm 库），可以把视图逻辑移出 XAML 后台代码',
        'UI 元素只能在 UI 线程上更新；后台线程的工作要通过 `DispatcherQueue` 调度回 UI 线程',
      ],
    },
  },
  {
    slug: 'claudecode',
    name: 'Claude Code',
    category: 'AI',
    tagline: "Anthropic's coding agent that works in a repository from the terminal, an IDE or the desktop app.",
    understanding: [
      'Claude Code reads files, searches the codebase, runs shell commands and edits across multiple files to complete a task described in natural language. It shows each step and asks for permission before actions according to the configured permission mode.',
      'A `CLAUDE.md` file in the repository records conventions and project notes, and is loaded into every session. It connects to external tools through MCP servers, and supports subagents, hooks and custom slash commands. It runs in the terminal, in VS Code and JetBrains IDEs, in the Claude desktop app and on the web.',
    ],
    points: [
      '`CLAUDE.md` holds project conventions, build commands and known pitfalls for every session to read',
      'Tasks with a clear goal and a way to verify the result, such as a failing test, are completed most reliably',
      'Changes are reviewed in the diff before they are committed',
    ],
    zh: {
      tagline: 'Anthropic 推出的编程智能体，可在终端、IDE 或桌面应用中直接在仓库里工作。',
      understanding: [
        'Claude Code 会读取文件、搜索代码库、运行 shell 命令，并跨多个文件修改代码，来完成用自然语言描述的任务。它会展示每一步，并按照配置的权限模式在操作前请求许可。',
        '仓库中的 `CLAUDE.md` 文件记录约定和项目说明，每次会话都会加载。它通过 MCP 服务器连接外部工具，支持子智能体、hook 和自定义斜杠命令。它可以在终端、VS Code 和 JetBrains IDE、Claude 桌面应用以及网页中运行。',
      ],
      points: [
        '`CLAUDE.md` 存放项目约定、构建命令和已知的坑，供每次会话读取',
        '目标清楚、结果可验证（比如有一个失败的测试）的任务，完成得最稳定',
        '改动在提交前通过 diff 审查',
      ],
    },
  },
  {
    slug: 'codex',
    name: 'Codex',
    category: 'AI',
    tagline: "OpenAI's coding agent, available as a CLI, an IDE extension and a cloud service.",
    understanding: [
      'Codex reads and edits code, runs commands and tests, and proposes changes for a described task. The Codex CLI runs locally in the terminal with configurable approval modes; Codex in ChatGPT runs tasks in cloud sandboxes and returns the result as a diff or a pull request.',
      'An `AGENTS.md` file in the repository gives it build commands, test commands and project conventions. Cloud tasks run in parallel and asynchronously, so several independent tasks can be started at once and reviewed when they finish.',
    ],
    points: [
      '`AGENTS.md` lists how to build, test and lint the project',
      'Cloud tasks run in isolated containers with the repository checked out',
      'A second model reviewing a change catches a different set of mistakes from the model that wrote it',
    ],
    zh: {
      tagline: 'OpenAI 推出的编程智能体，提供命令行工具、IDE 扩展和云端服务。',
      understanding: [
        'Codex 针对描述的任务读取和修改代码、运行命令和测试，并给出改动方案。Codex CLI 在本地终端运行，审批模式可配置；ChatGPT 中的 Codex 在云端沙箱中执行任务，以 diff 或 pull request 的形式返回结果。',
        '仓库中的 `AGENTS.md` 文件为它提供构建命令、测试命令和项目约定。云端任务以并行、异步的方式运行，可以同时启动多个相互独立的任务，完成后再审查。',
      ],
      points: [
        '`AGENTS.md` 写明如何构建、测试和检查项目',
        '云端任务在隔离的容器中运行，容器里检出了仓库代码',
        '由另一个模型审查改动，能发现与编写它的模型不同的一类错误',
      ],
    },
  },
  {
    slug: 'googlegemini',
    name: 'Gemini',
    category: 'AI',
    tagline: "Google's family of multimodal models, which I use for questioning a subject until it is clear.",
    understanding: [
      'Gemini is a family of large language models from Google DeepMind that accept text, images, audio, video and documents. It is available in the Gemini app, through the Gemini API and Vertex AI, and inside Google products. Its context window holds very long inputs, such as entire papers or books.',
      'I use it mainly for knowledge questions, in a Socratic way: ask what something is, then why, then what follows, and keep going through each answer until the definitions and their premises are clear. Each answer is a step in that line of questioning.',
    ],
    points: [
      'Supplying the source document grounds the answers in that text',
      'Asking for the reasoning and for counter-arguments exposes the premises behind an answer',
      'Specific facts such as figures, versions and recent events are checked against primary sources',
    ],
    zh: {
      tagline: 'Google 的多模态模型家族，我用它对一个问题持续追问，直到弄清为止。',
      understanding: [
        'Gemini 是 Google DeepMind 推出的大语言模型家族，可以接收文本、图片、音频、视频和文档。它可以在 Gemini 应用中使用，也可以通过 Gemini API、Vertex AI 以及各个 Google 产品使用。它的上下文窗口能容纳很长的输入，比如整篇论文或整本书。',
        '我主要用它做知识问答，方式是苏格拉底式的：先问一个东西是什么，再问为什么，再问由此推出什么，沿着每个回答一路追问下去，直到定义和它背后的前提都清楚为止。每个回答都是这条追问路线上的一步。',
      ],
      points: [
        '提供原始文档，可以让回答以该文本为依据',
        '要求给出推理过程和反方论证，能暴露回答背后的前提',
        '数字、版本、近期事件等具体事实，会回到原始资料核对',
      ],
    },
  },
  {
    slug: 'ollama',
    name: 'Ollama',
    category: 'AI',
    tagline: 'A tool for downloading and running open-weight language models on a local machine.',
    understanding: [
      '`ollama run <model>` downloads a model and starts serving it. Models are stored as quantised weights and run through a llama.cpp-based engine on CPU, Apple Silicon or NVIDIA and AMD GPUs. A Modelfile sets the system prompt, parameters and template for a custom model.',
      'Ollama exposes a local HTTP API, including an OpenAI-compatible endpoint, so existing client libraries can use it by changing the base URL. It is used for offline work, for data that must stay on the machine, and for embeddings and other high-volume, low-latency calls.',
    ],
    points: [
      'The OpenAI-compatible endpoint is served at `http://localhost:11434/v1`',
      'Quantisation levels such as Q4 and Q8 trade model quality for memory; the whole model fits best in VRAM or unified memory',
      'The context length is configurable per model and affects memory use',
    ],
    zh: {
      tagline: '一个在本地机器上下载并运行开源权重语言模型的工具。',
      understanding: [
        '`ollama run <model>` 会下载模型并开始提供服务。模型以量化权重存储，通过基于 llama.cpp 的引擎在 CPU、Apple Silicon 或 NVIDIA、AMD 显卡上运行。Modelfile 可以为自定义模型设置系统提示词、参数和模板。',
        'Ollama 提供本地 HTTP API，其中包括兼容 OpenAI 的接口，现有的客户端库改一下 base URL 就能使用。它用于离线工作、数据不能离开本机的场景，以及向量嵌入等调用量大、要求低延迟的任务。',
      ],
      points: [
        '兼容 OpenAI 的接口地址是 `http://localhost:11434/v1`',
        'Q4、Q8 等量化等级在模型质量和内存之间取舍；整个模型能放进显存或统一内存时效果最好',
        '上下文长度可以按模型配置，并会影响内存占用',
      ],
    },
  },
  {
    slug: 'huggingface',
    name: 'Hugging Face',
    category: 'AI',
    tagline: 'A platform for hosting and sharing machine learning models, datasets and demos.',
    understanding: [
      'The Hugging Face Hub hosts open-weight models, datasets and Spaces (hosted demo apps) as Git repositories. Each model has a model card describing its training data, intended use, limitations and licence. Community members publish fine-tunes and quantised builds, such as GGUF files for llama.cpp and Ollama.',
      'Its libraries include Transformers for loading and running models, Datasets for data loading, Tokenizers, PEFT for parameter-efficient fine-tuning, and Diffusers for image models. Inference Endpoints and Inference Providers serve models through an API.',
    ],
    points: [
      'Model licences vary, and some open-weight models restrict commercial use',
      'Downloading by `revision` pins a model to a specific commit of its repository',
      'Community GGUF builds differ in quantisation and context length, which are listed in the file names and model card',
    ],
    zh: {
      tagline: '一个托管和分享机器学习模型、数据集和演示应用的平台。',
      understanding: [
        'Hugging Face Hub 以 Git 仓库的形式托管开源权重模型、数据集和 Spaces（托管的演示应用）。每个模型都有模型卡，说明训练数据、适用场景、局限和许可证。社区成员会发布微调版本和量化版本，比如供 llama.cpp 和 Ollama 使用的 GGUF 文件。',
        '它的库包括用于加载和运行模型的 Transformers、用于加载数据的 Datasets、Tokenizers、用于参数高效微调的 PEFT，以及用于图像模型的 Diffusers。Inference Endpoints 和 Inference Providers 通过 API 提供模型服务。',
      ],
      points: [
        '模型的许可证各不相同，部分开源权重模型限制商用',
        '按 `revision` 下载，可以把模型锁定到仓库的某个特定提交',
        '社区 GGUF 构建在量化方式和上下文长度上各不相同，这些信息写在文件名和模型卡中',
      ],
    },
  },
];
