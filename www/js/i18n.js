/* Recalbox OS Web — tiny i18n runtime
 * ----------------------------------------------------------------------------
 * Design notes
 *  - English is the source language: the English text itself is the key, so a
 *    missing translation simply falls back to English (same idea as the
 *    EmulatorJS localization files shipped in data/localization/).
 *  - Loaded synchronously BEFORE app.js, so the first paint is already in the
 *    user's language (no flash of English).
 *  - `{name}` placeholders are substituted by t(); values are escaped by the
 *    caller when they end up in innerHTML (app.js already uses esc()).
 *  - Static markup uses data-i18n / data-i18n-title / data-i18n-ph attributes.
 *  - Adding a language = adding one entry to DICT (no build step).
 */
(function (global) {
  "use strict";

  /* ============================ dictionaries ============================ */
  /* zh-CN — keyed by the English source string */
  var ZH = {
    /* ---------- boot / shell ---------- */
    "Recalbox OS Web — Multi-System": "Recalbox OS Web — 多机种模拟器",
    "STANDALONE · OFFLINE · 26 SYSTEMS · FREE GAME LIBRARY · NES · SNES · N64 · GENESIS · GB · GBA · PSX · ARCADE · DOS · MORE":
      "独立运行 · 完全离线 · 26 个机种 · 免费游戏库 · NES · SNES · N64 · GENESIS · GB · GBA · PSX · 街机 · DOS · 更多",
    "[ CLICK · PRESS ANY KEY · OR ANY GAMEPAD BUTTON ]": "[ 点击 · 按任意键 · 或按手柄任意键 ]",
    "loading kernel ........ ok": "加载内核 ........ 完成",
    "mounting library ......": "挂载游戏库 ......",
    "initializing emulators . ok": "初始化模拟器 .. 完成",
    "SELECT YOUR": "选择你的",
    "SYSTEM": "机种",
    "SYSTEMS": "机种",
    "COLLECTIONS": "收藏",
    "SEARCH": "搜索",
    "SETTINGS": "设置",
    "HELP": "帮助",
    "SORT": "排序",
    "VIEW": "视图",
    "RANDOM": "随机",
    "ADD GAMES": "添加游戏",
    "QUIT": "退出",
    "SAVE": "存档",
    "LOAD": "读档",
    "REWIND": "回退",
    "FAST-FWD": "快进",
    "SHOT": "截图",
    "MENU": "菜单",
    "CONTROL CENTER": "控制中心",
    "BOOTING…": "启动中…",
    "CONTROLS": "操作说明",
    "MOVE": "移动",
    "ENTER / A": "回车 / A",
    "ESC / B": "ESC / B",
    "RESUME": "继续",
    "CHANGE": "调整",
    "CLOSE": "关闭",
    "SELECT": "选择",
    "DROP GAME FILES — OR A BIOS FOLDER / PACK": "拖入游戏文件 — 或 BIOS 文件夹 / 合集",
    "games: the system is detected from the file extension · BIOS files: identified by name or checksum and routed to their system":
      "游戏：按扩展名自动识别机种 · BIOS：按文件名或校验和识别并归入对应机种",
    "POWERED BY EMULATORJS (GPL)": "由 EMULATORJS 驱动 (GPL)",
    "CLICK · PRESS ANY KEY": "点击 · 按任意键",

    /* ---------- systems screen ---------- */
    "{n} GAME": "{n} 个游戏",
    "{n} GAMES": "{n} 个游戏",
    "{n} SYSTEM": "{n} 个机种",
    "{n} SYSTEMS": "{n} 个机种",
    "CORE MISSING": "核心缺失",
    "NOT BUNDLED": "未内置",
    "BIOS OK": "BIOS 正常",
    "BIOS MISSING": "BIOS 缺失",
    "BIOS NEEDED": "需要 BIOS",

    /* ---------- library ---------- */
    "FILTER GAMES… (F)": "筛选游戏… (F)",
    "NO GAMES": "没有游戏",
    "NO GAME MATCHES": "没有匹配的游戏",
    "NO FAVORITES YET": "还没有收藏",
    "NOTHING PLAYED YET": "还没有玩过游戏",
    "NO GAMES YET FOR": "还没有游戏：",
    "DROP FILES ANYWHERE IN THIS WINDOW OR CLICK": "把文件拖进窗口任意位置，或点击",
    "ACCEPTED:": "支持格式：",
    "ADD GAME": "添加游戏",
    "ADD GAMES TO": "添加游戏到",
    "FREE": "免费",
    "FAVORITE": "已收藏",
    "PLAYED": "已玩",
    "TIME": "时长",
    "LAST": "最近",
    "INFO": "信息",
    "SORT:": "排序：",
    "FILTER:": "筛选：",
    "A-Z": "A-Z",
    "LAST PLAYED": "最近玩过",
    "DATE ADDED": "添加日期",
    "MOST PLAYED": "玩得最多",
    "Grid": "网格",
    "List": "列表",
    "Grid view": "网格视图",
    "List view": "列表视图",
    "Recently played": "最近玩过",
    "Favorites": "收藏",
    "All games": "全部游戏",
    "RECENT": "最近",
    "FAVS": "收藏",
    "ALL": "全部",

    /* ---------- game options ---------- */
    "Play": "开始游戏",
    "Remove from favorites": "取消收藏",
    "Add to favorites": "加入收藏",
    "Game info": "游戏信息",
    "Fix this romset": "修复这个 ROM 集",
    "Rename": "重命名",
    "Move to another system": "移动到其他机种",
    "Clear saved states & box art": "清除存档与封面",
    "Delete game": "删除游戏",
    "File details": "文件详情",
    "Show the keyboard / pad layout (tattoo)": "查看键盘 / 手柄布局",
    "Deletes save states stored for this game": "删除这个游戏保存的存档",
    "Removes the file from the library": "从游戏库中移除该文件",
    "Bundled free games cannot be deleted (hide the system instead)": "内置免费游戏不能删除（可以隐藏该机种）",
    "Controls for": "操作说明：",
    "Current:": "当前：",
    "RENAME GAME": "重命名游戏",
    "MOVE TO SYSTEM": "移动到机种",
    "DELETE": "删除",
    "Yes, delete": "确认删除",
    "This removes the game (and its saved states) from the library.": "这会从游戏库中删除该游戏及其存档。",
    "SAVED STATES & BOX ART CLEARED": "存档与封面已清除",
    "RENAMED": "已重命名",
    "DELETED": "已删除",
    "ADDED TO": "已加入",
    "REMOVED FROM FAVORITES": "已取消收藏",
    "FAVORITES": "收藏",

    /* ---------- settings ---------- */
    "Global options applied to every game (like RetroBat's Game Settings). Per-game options live in the in-game menu.":
      "对所有游戏生效的全局选项（类似 RetroBat 的 Game Settings）。单个游戏的选项在游戏内菜单里。",
    "Shader set": "着色器",
    "CRT filters give the authentic scanline look": "CRT 滤镜可还原扫描线效果",
    "Rewind": "回退",
    "Hold F9 / HOTKEY+← to rewind time (costs some CPU)": "按住 F9 / 热键+← 回退时间（会占用一些 CPU）",
    "Auto save / load state": "自动存档 / 读档",
    "Save a state on exit and resume it on next launch": "退出时保存状态，下次启动自动继续",
    "Fast-forward ratio": "快进倍率",
    "Show FPS": "显示 FPS",
    "Smooth games (bilinear)": "平滑画面（双线性）",
    "Off = crisp pixels": "关闭 = 清晰像素",
    "Volume": "音量",
    "Gamepad HOTKEY button": "手柄热键按钮",
    "Hold it with another button for shortcuts": "按住它再按其他键触发快捷键",
    "Navigation sounds": "导航音效",
    "Theme": "主题",
    "Hide systems without games": "隐藏没有游戏的机种",
    "Like RetroBat: only systems with ROMs appear": "类似 RetroBat：只显示有 ROM 的机种",
    "Kid mode": "儿童模式",
    "Hides add / delete / rename and the Settings button — press S or START to come back here":
      "隐藏添加 / 删除 / 重命名和设置按钮 — 按 S 或 START 回到这里",
    "Emulators": "模拟器",
    "Bundled cores (offline) —": "内置核心（离线）—",
    "Missing BIOS check": "缺失 BIOS 检查",
    "List every BIOS file that is still missing": "列出所有仍然缺失的 BIOS 文件",
    "Storage": "存储",
    "See what the library uses": "查看游戏库占用的空间",
    "Export library list": "导出游戏库列表",
    "Download a JSON with your game list & stats": "下载包含游戏列表与统计的 JSON",
    "Reset all settings": "重置所有设置",
    "SETTINGS RESET": "设置已重置",
    "Help & shortcuts": "帮助与快捷键",
    "About": "关于",
    "Language": "界面语言",
    "Interface language — the in-game EmulatorJS menu follows it on the next launch":
      "界面语言 — 游戏内的 EmulatorJS 菜单会在下次启动时跟随此设置",
    "Auto (system)": "自动（跟随系统）",
    "English": "English",
    "中文（简体）": "中文（简体）",
    "Disabled": "关闭",
    "Carbon (dark)": "Carbon（深色）",
    "Recalbox orange": "Recalbox 橙色",
    "Ocean blue": "海洋蓝",
    "Unlimited": "不限速",

    /* ---------- modal / common ---------- */
    "OK": "确定",
    "Cancel": "取消",
    "Close": "关闭",
    "Back": "返回",
    "Back (ESC)": "返回 (ESC)",
    "Skip this file": "跳过此文件",
    "Try anyway": "仍然尝试",
    "Install BIOS now": "立即安装 BIOS",
    "Pick another file": "选择其他文件",
    "Install": "安装",
    "Install all": "全部安装",
    "REMOVE": "移除",
    "Add": "添加",

    /* ---------- cores ---------- */
    "EMULATORS": "模拟器",
    "EMULATOR CORE ·": "模拟器核心 ·",
    "How to add the core": "如何添加核心",
    "Run  npm run cores  in the project folder (needs internet once), then restart the app. Installers built with npm run dist always include every core.":
      "在项目目录运行 npm run cores（需要联网一次），然后重启应用。用 npm run dist 打包的安装包总是包含全部核心。",
    "Clear this core's cache": "清除该核心的缓存",
    "The runtime caches decompressed cores in IndexedDB; clearing forces a re-read from the bundled file":
      "运行时会缓存解压后的核心到 IndexedDB；清除后会重新读取内置文件",
    "Clear emulator core cache": "清除模拟器核心缓存",
    "Cores are re-read from disk on next launch (frees space)": "下次启动时重新从磁盘读取（释放空间）",
    "CORE CACHE CLEARED": "核心缓存已清除",
    "READY": "就绪",
    "MISSING": "缺失",
    "FILE": "文件",
    "FILES": "文件",
    "location: app/data/cores/": "位置：app/data/cores/",

    /* ---------- BIOS ---------- */
    "BIOS ·": "BIOS ·",
    "MISSING BIOS CHECK": "缺失 BIOS 检查",
    "All known BIOS files are installed.": "所有已知 BIOS 文件都已安装。",
    "WHERE DO BIOS FILES COME FROM?": "BIOS 文件从哪来？",
    "Where do BIOS files come from?": "BIOS 文件从哪来？",
    "This app never downloads anything — you bring the files, it verifies them offline.":
      "本应用不下载任何东西 — 文件由你提供，应用离线校验。",
    "Import a BIOS folder / pack…": "导入 BIOS 文件夹 / 合集…",
    "Import a BIOS folder / pack": "导入 BIOS 文件夹 / 合集…",
    "Add any other BIOS file…": "添加其他 BIOS 文件…",
    "For files not listed above (name is kept as-is)": "用于上方列表之外的文件（保留原文件名）",
    "Pick a whole folder (RetroBIOS pack, RetroArch system/, Recalbox bios/ …): every file is recognised by name or checksum and routed to its system":
      "选择整个文件夹（RetroBIOS 合集、RetroArch system/、Recalbox bios/ …）：每个文件按名称或校验和识别并归入对应机种",
    "RetroBIOS pack, RetroArch system/ or Recalbox bios/ folder — every file is recognised by name or checksum and routed to its system":
      "RetroBIOS 合集、RetroArch system/ 或 Recalbox bios/ 文件夹 — 每个文件按名称或校验和识别并归入对应机种",
    "RetroBIOS (abdess.github.io/retrobios) — verified packs; this app checks them offline":
      "RetroBIOS（abdess.github.io/retrobios）— 已验证的合集；本应用离线校验",
    "BIOS files are stored inside the app and mounted for the emulator at start. Names must match exactly — files are checked against the RetroBIOS checksum table when you pick them, and a whole pack can be dropped on this window.":
      "BIOS 文件保存在应用内，启动模拟器时挂载。文件名必须完全一致 — 选择文件时会对照 RetroBIOS 校验和表检查，整个合集也可以直接拖进窗口。",
    "NO BIOS FILES RECOGNISED": "没有识别出 BIOS 文件",
    "BIOS IMPORT ·": "BIOS 导入 ·",
    "BIOS INSTALLED:": "BIOS 已安装：",
    "CHECKING": "检查中",
    "installed": "已安装",
    "optional": "可选",
    "REQUIRED": "必需",
    "NEEDED BY": "需要它：",
    "replaces installed": "替换已安装版本",
    "verified ✓": "校验通过 ✓",
    "unknown checksum": "未知校验和",
    "wrong size": "大小不符",
    "will be converted for MAME 2003-Plus": "将转换为 MAME 2003-Plus 格式",
    "wrong version for this core": "此核心可用的版本不对",
    "Convert and install as the MAME 2003-Plus neogeo.zip": "转换并安装为 MAME 2003-Plus 的 neogeo.zip",
    "builds mame.sm1 / sfix.sfx / mamelo.lo … from this zip — your file is not modified":
      "从这个 zip 生成 mame.sm1 / sfix.sfx / mamelo.lo … — 原文件不会被修改",
    "CONVERTING NEOGEO.ZIP …": "正在转换 NEOGEO.ZIP …",
    "CONVERTING NEOGEO.ZIP FOR MAME 2003-PLUS …": "正在为 MAME 2003-PLUS 转换 NEOGEO.ZIP …",
    "UNKNOWN": "未知",
    "CHECKSUM": "校验和",
    "THIS IS NOT": "这不是",

    /* ---------- adding games / arcade ---------- */
    "WHICH SYSTEM?": "哪个机种？",
    "can belong to several systems": "可能属于多个机种",
    "NO GAMES TO PICK FROM": "没有可挑选的游戏",
    "KID MODE IS ON — TURN IT OFF IN SETTINGS (S) TO ADD GAMES": "儿童模式已开启 — 在设置中关闭 (S) 才能添加游戏",
    "RoMSET CHECK": "ROMSET 检查",
    "ROMSET CHECK": "ROMSET 检查",
    "Fix it — rebuild the zip for": "修复 — 为该核心重建 zip：",
    "Fix it — identify the game and rebuild the zip": "修复 — 识别游戏并重建 zip",
    "renames / re-cuts the files to what this core expects, pulls parent & BIOS files from your other zips · offline, your file is not modified":
      "按该核心的要求重命名 / 重新切分文件，从其他 zip 中补齐父集与 BIOS 文件 · 完全离线，原文件不会被修改",
    "renamed inside the library, the original file is untouched": "在库内重命名，原文件保持不变",
    "Add anyway (it will not run)": "仍然添加（无法运行）",
    "Add anyway": "仍然添加",
    "Keep the game as it is": "保持游戏原样",
    "Add the original file unchanged": "添加原始文件（不做修改）",
    "it will most likely not run": "它很可能无法运行",
    "NO KNOWN GAME INSIDE": "无法识别游戏：",
    "COULD NOT FIX": "无法修复",
    "REBUILD FAILED:": "重建失败：",
    "WRITING": "正在写入",
    "FIXED:": "已修复：",
    "PARTLY FIXED:": "部分修复：",
    "CANNOT FIX:": "无法修复：",
    "FIXED": "已修复",
    "PARTLY FIXED": "部分修复",
    "REBUILT": "已重建",
    "PARTLY REBUILT": "部分重建",
    "ADDED": "已添加",
    "PARENT": "父集",
    "GAME": "游戏",
    "BIOS": "BIOS",
    "source": "来源",
    "sources": "来源",
    "searched": "已搜索",
    "as is": "原样",
    "renamed": "重命名",
    "joined from parts": "由分片合并",
    "cut out of a bigger file": "从更大的文件切出",
    "interleaved from two files": "由两个文件交错",
    "de-interleaved": "解交错",
    "newer dump (core warns, plays)": "较新的 dump（核心警告但仍可运行）",
    "unreadable (compression not supported)": "无法读取（不支持的压缩）",

    /* ---------- player ---------- */
    "LOADING CORE…": "正在加载核心…",
    "STARTING…": "正在启动…",
    "STATE SAVED · SLOT": "存档已保存 · 槽位",
    "STATE LOADED · SLOT": "存档已读取 · 槽位",
    "NO SAVED STATE IN SLOT": "该槽位没有存档",
    "SAVE FAILED": "保存失败",
    "LOAD FAILED": "读取失败",
    "SCREENSHOT FAILED": "截图失败",
    "SCREENSHOT SAVED (ALSO USED AS BOX ART)": "截图已保存（同时用作封面）",
    "REWIND IS OFF — ENABLE IT IN SETTINGS": "回退已关闭 — 请在设置中开启",
    "FAST-FORWARD": "快进",
    "REWIND": "回退",
    "PAUSED": "已暂停",
    "RESUMED": "已继续",
    "SLOT": "槽位",
    "has a save": "有存档",
    "empty": "空",
    "SAVE STATE": "保存状态",
    "LOAD STATE": "读取状态",
    "STATE SLOT": "状态槽位",
    "also sets box art": "同时设为封面",
    "EMULATOR MENU": "模拟器菜单",
    "shaders · core options · remap": "着色器 · 核心选项 · 按键映射",
    "RESET GAME": "重置游戏",
    "QUIT GAME": "退出游戏",
    "CONTROLS ·": "操作说明 ·",
    "tattoo for": "操作说明：",
    "First launch on this system — here is the default layout. Change it any time from the in-game menu (Control Settings).":
      "首次在该机种运行 — 这是默认布局。随时可在游戏内菜单（Control Settings）中修改。",
    "Default keyboard layout. Any gamepad works out of the box (standard mapping). Remap in the in-game menu.":
      "默认键盘布局。任意手柄即插即用（标准映射）。可在游戏内菜单中重映射。",
    "First launch on this system": "首次在该机种运行",
    "here is the default layout. Change it any time from the in-game menu (Control Settings).":
      "这是默认布局。随时可在游戏内菜单（Control Settings）中修改。",
    "HOTKEYS (KEYBOARD)": "快捷键（键盘）",
    "F1 MENU · F2 SAVE STATE · F4 LOAD STATE · F6/F7 SLOT −/+ · F8 SCREENSHOT · F9 REWIND (HOLD) · SPACE FAST-FORWARD (HOLD) · P PAUSE · F11 FULLSCREEN · CTRL+F12 CONTROL CENTER · ESC QUIT":
      "F1 菜单 · F2 存档 · F4 读档 · F6/F7 槽位 −/+ · F8 截图 · F9 回退（按住）· 空格 快进（按住）· P 暂停 · F11 全屏 · CTRL+F12 控制中心 · ESC 退出",
    "F10 FAST-FORWARD (HOLD)": "F10 快进（按住）",
    "SPACE FAST-FORWARD (HOLD) · P PAUSE": "空格 快进（按住）· P 暂停",
    "(computer system: SPACE and letters go to the emulated keyboard)": "（电脑机种：空格和字母会传给模拟键盘）",
    "HOTKEYS (GAMEPAD · HOLD SELECT)": "快捷键（手柄 · 按住 SELECT）",
    "HOTKEYS (GAMEPAD · HOLD L2)": "快捷键（手柄 · 按住 L2）",
    "HOTKEYS (GAMEPAD · HOLD R2)": "快捷键（手柄 · 按住 R2）",
    "HOTKEYS (GAMEPAD · HOLD L3)": "快捷键（手柄 · 按住 L3）",
    "START = QUIT ·": "START = 退出 ·",
    "B = CONTROL CENTER": "B = 控制中心",
    "A = PAUSE": "A = 暂停",
    "Y = SAVE STATE": "Y = 存档",
    "X = LOAD STATE": "X = 读档",
    "↑/↓ = SLOT +/−": "↑/↓ = 槽位 +/−",
    "← = REWIND": "← = 回退",
    "→ = FAST-FORWARD": "→ = 快进",
    "R3 = SCREENSHOT": "R3 = 截图",
    "THIS ROMSET CANNOT RUN ON": "该 ROMSET 无法在此核心运行：",
    "GAME CONTROL CENTER": "游戏控制中心",
    "SMALL": "小",

    /* ---------- misc / status ---------- */
    "STORAGE": "存储",
    "GAMES:": "游戏：",
    "BOX ART (screenshots):": "封面（截图）：",
    "APP STORAGE USED:": "应用已用空间：",
    "of": "共",
    "available": "可用",
    "HELP & SHORTCUTS": "帮助与快捷键",
    "SYSTEM VIEW": "机种页",
    "GAME VIEW": "游戏页",
    "GAMEPAD (MENUS)": "手柄（菜单）",
    "IN GAME": "游戏中",
    "ABOUT": "关于",
    "OFFLINE BY DESIGN": "离线设计",
    "FREE GAME LIBRARY": "免费游戏库",
    "STANDALONE": "独立运行",
    "OFFLINE": "离线",
    "PLAYER": "玩家",
    "Connected Gamepad": "已连接手柄",
    "Gamepad": "手柄",
    "Keyboard": "键盘",
    "Set": "设置",
    "Fast": "快",
    "Slow": "慢",
    "just now": "刚刚",
    "never": "从未",
    "min ago": "分钟前",
    "h ago": "小时前",
    "d ago": "天前",
    "PLAYER 1": "玩家 1",
    "PLAYER 2": "玩家 2",

    "SCREENSHOT": "截图",
    "FULLSCREEN": "全屏",
    "ADD TO FAVORITES": "加入收藏",
    "REMOVE FROM FAVORITES": "取消收藏",
    "return to library": "返回游戏库",
    "tattoo for": "操作说明：",
    "this session": "本次",
    "total": "总计",
    "rewind off": "回退关",
    "rewind on": "回退开",
    "shader off": "着色器关",

    /* ---------- system metadata (notes / BIOS descriptions) ---------- */
    "8-bit home console": "8 位家用机",
    "16-bit home console": "16 位家用机",
    "32-bit home console": "32 位家用机",
    "3D era · 64-bit": "3D 时代 · 64 位",
    "8-bit handheld": "8 位掌机",
    "16-bit handheld": "16 位掌机",
    "32-bit handheld": "32 位掌机",
    "64-bit handheld": "64 位掌机",
    "dual-screen handheld": "双屏掌机",
    "32-bit CD console": "32 位 CD 主机",
    "64-bit console": "64 位主机",
    "16-bit console": "16 位主机",
    "8-bit console": "8 位主机",
    "first-gen console": "第一代主机",
    "home console": "家用机",
    "handheld": "掌机",
    "handheld · needs a fast PC": "掌机 · 需要较快的电脑",
    "CD add-on": "CD 扩展",
    "home computer": "家用电脑",
    "home computer · needs Kickstart": "家用电脑 · 需要 Kickstart",
    "coin-op · CPS / Neo Geo / more": "街机 · CPS / Neo Geo 等",
    "classic arcade (0.78 romset)": "经典街机（0.78 romset）",
    "PC games 1980s-90s": "1980-90 年代 PC 游戏",
    "Famicom Disk System (only for .fds)": "磁碟机（仅 .fds 需要）",
    "Optional, improves compatibility": "可选，可提升兼容性",
    "US BIOS (recommended)": "美版 BIOS（推荐）",
    "US BIOS (alt)": "美版 BIOS（备选）",
    "US BIOS": "美版 BIOS",
    "JP BIOS": "日版 BIOS",
    "EU BIOS": "欧版 BIOS",
    "Saturn BIOS": "Saturn BIOS",
    "Lynx boot ROM": "Lynx 启动 ROM",
    "Kickstart 1.3 (A500)": "Kickstart 1.3（A500）",
    "Kickstart 3.1 (A1200)": "Kickstart 3.1（A1200）",
    "Only for CD games": "仅 CD 游戏需要",
    "Required for Neo Geo games": "Neo Geo 游戏需要",
    "PGM games": "PGM 游戏",
    "Atari 5200 BIOS": "Atari 5200 BIOS",
    "Required for": "需要：",
    "games": "游戏",
    "missing": "缺失",
    "not found": "未找到",

    /* ---------- template strings (used with {vars}) ---------- */
    "{n} game": "{n} 个游戏",
    "{n} games": "{n} 个游戏",
    "{n} file": "{n} 个文件",
    "{n} files": "{n} 个文件",
    "{n} file checked": "已检查 {n} 个文件",
    "{n} files checked": "已检查 {n} 个文件",
    "{n} file recognised": "识别出 {n} 个文件",
    "{n} files recognised": "识别出 {n} 个文件",
    "{n} system": "{n} 个机种",
    "{n} systems": "{n} 个机种",
    "{n} ignored (not a BIOS this app lists)": "已忽略 {n} 个（不是本应用列出的 BIOS）",
    "{n} already installed will be replaced": "{n} 个已安装的将被替换",
    "{n} verified against RetroBIOS checksums": "{n} 个已通过 RetroBIOS 校验",
    "Install {n} file": "安装 {n} 个文件",
    "Install {n} files": "安装 {n} 个文件",
    "Install all {n}, including the wrong ones": "全部安装 {n} 个（包括错误的）",
    "ADDED {n} GAME": "已添加 {n} 个游戏",
    "ADDED {n} GAMES": "已添加 {n} 个游戏",
    " TO ": " 到 ",
    " · SKIPPED {n}": " · 跳过 {n} 个",
    "FILE TYPE NOT ACCEPTED HERE:": "此处不接受该文件类型：",
    "UNKNOWN FILE TYPE:": "未知文件类型：",
    "COULD NOT STORE FILE (STORAGE FULL?) — IT WILL WORK UNTIL RESTART": "无法保存文件（存储已满？）— 重启前仍可运行",
    "COULD NOT DELETE FROM STORAGE": "无法从存储中删除",
    "BUNDLED FREE GAMES CANNOT BE DELETED": "内置免费游戏不能删除",
    "MOVED TO": "已移动到",
    "SORT:": "排序：",
    "SLOT": "槽位",
    "FILE {n} COULD NOT BE PRODUCED": "无法生成 {n} 个文件",
    "{n} FILE COULD NOT BE PRODUCED": "无法生成 {n} 个文件",
    "{n} FILES COULD NOT BE PRODUCED": "无法生成 {n} 个文件",
    "TO": "到",
    "FILE": "文件",
    "FILES": "文件",
    "GAME": "游戏",
    "GAMES": "游戏",
    "SYSTEM": "机种",
    "SYSTEMS": "机种",
    "PLAYED": "已玩",
    "LAST": "最近",
    "TIME": "时长",
    "INFO": "信息",
    "REQUIRED": "必需",
    "NEEDED": "需要",
    "OPTIONAL": "可选",
    "WARN": "警告",
    "READY": "就绪",
    "NEEDS BIOS": "需要 BIOS",
    "CHECK BIOS": "检查 BIOS",
    "WON'T RUN": "无法运行",
    "INCOMPLETE": "不完整",
    "romset check:": "romset 检查：",
    "needs": "需要",
    "the installed": "已安装的",
    "installed ✓": "已安装 ✓",
    "present ✓": "已存在 ✓",
    "Install it as": "安装为",
    "that is what this file really is": "这才是该文件真正的身份",
    "not in these files — install it from the BIOS button": "不在这些文件中 — 请通过 BIOS 按钮安装",
    "found in your files — will be installed": "在你的文件中找到 — 将安装",
    "from": "来自",
    "was": "原为",
    "Other matches:": "其他匹配：",
    "Other matches": "其他匹配",
    "Tip: arcade zips must keep their original short name and come from a romset built for":
      "提示：街机 zip 必须保留原始短名，且来自为以下核心构建的 romset：",
    "Newer MAME sets are split differently and fail with checksum errors.":
      "较新的 MAME 集合切分方式不同，会因校验和错误而失败。",
    "How to get it playing:": "如何让它跑起来：",
    "It also needs the BIOS set:": "它还需要 BIOS 集合：",
    "pick": "选择",
    "from a": "来自",
    "romset (the same set your game zip came from). Install it here once — via the button below or the":
      "romset（与你的游戏 zip 同源）。在这里安装一次即可 — 通过下方按钮或",
    "chip in the top bar of this library — and every": "本库顶栏的芯片 — 之后每个",
    "game will start.": "游戏都能启动。",
    "Replace": "替换",
    "via the": "通过",
    "button with the one from a": "按钮换成来自",
    "Add": "添加",
    "to this library as well (it is checked like any other game).": "到游戏库（它会像其他游戏一样被检查）。",
    "Clone of": "克隆自",
    "sources:": "来源：",
    "The rebuilt": "重建后的",
    "has every file": "包含该核心需要的全部文件：",
    "opens, with the exact names and checksums of the": "按以下版本要求的名称与校验和：",
    "set.": "集合。",
    "not in any of your files": "不在你的任何文件中",
    "the other": "其余",
    "are fine": "没有问题",
    "Small PROM / PLD / sound files were often left out of old collections — the game may still start.":
      "旧的合集中常缺少小的 PROM / PLD / 音效文件 — 游戏可能仍能启动。",
    "Look for": "请在",
    "in a": "中的",
    "and drop it together with this zip.": "里查找，并与该 zip 一起拖入。",
    "identified as": "识别为",
    "all": "全部",
    "of its files were recognised by checksum": "个文件通过校验和被识别",
    "One more file": "还差一个文件",
    "One more file:": "还差一个文件：",
    "is complete and correct": "完整且正确",
    "It runs on the": "它运行在",
    "system board, whose own ROMs (": "主板上，其自带 ROM（",
    "…) are not part of any game zip — they come in a separate": "…）不属于任何游戏 zip — 它们位于单独的",
    "that is installed once and shared by every": "中，只需安装一次，供所有",
    "game.": "游戏共用。",
    "The game itself is complete, but your installed": "游戏本身完整，但你已安装的",
    "lacks": "缺少",
    "(or they have other checksums). The core needs the": "（或校验和不同）。核心需要",
    "version of it.": "版本。",
    "The game files are complete, but": "游戏文件完整，但是",
    "runs on the": "运行在",
    "and its system ROMs come in a separate": "主板上，其系统 ROM 位于单独的",
    "that is not installed yet. Without it the emulator cannot start the game.":
      "中，尚未安装。没有它模拟器无法启动游戏。",
    "needs a BIOS file to run games. Without it the game will most likely fail to start.":
      "需要 BIOS 文件才能运行游戏。没有它游戏很可能无法启动。",
    "pick the file from a": "请从以下 romset 中选择文件：",
    "This is": "这是",
    "it does not have the files this core opens:": "它不包含该核心打开的文件：",
    "The core opens these files from": "核心会从以下位置打开这些文件：",
    "and they are not in this zip": "但本 zip 中没有",
    "with the right checksum": "且校验和正确",
    "of": "共",
    "match": "匹配",
    "The data is the same, only the file names changed since MAME 0.78": "数据相同，只是 MAME 0.78 之后文件名变了",
    "The app can build the MAME 2003-Plus version from this zip, offline, in a second.":
      "应用可以离线、在一秒内从这个 zip 生成 MAME 2003-Plus 版本。",
    "Take": "请从",
    "romset — the same romset your game zips come from. Without it,": "romset 中获取 — 与你的游戏 zip 同源。没有它，",
    "games only show the emulator menu.": "游戏只会显示模拟器菜单。",
    "USABLE": "可用",
    "NEWER DUMP OF": "较新 dump：",
    "All the files MAME 2003-Plus opens are here.": "MAME 2003-Plus 打开的所有文件都在。",
    "is a newer dump than the MAME 0.78 list expects: the core logs a": "比 MAME 0.78 列表预期的更新：核心会记录一条",
    "warning and": "警告，但仍",
    "plays anyway": "可以运行",
    "(this is what a converted current-MAME neogeo.zip looks like).": "（转换后的现代 MAME neogeo.zip 就是这样）。",
    "Only the default system ROM is present — fine for playing; the alternate region / Universe BIOS versions are missing, so the BIOS-region option will have no effect.":
      "只有默认系统 ROM — 可以正常游戏；缺少其他区域 / Universe BIOS 版本，因此 BIOS 区域选项不会生效。",
    "Files:": "文件：",
    "None of these files is a BIOS this app lists (by name, by RetroBIOS alias or by checksum).":
      "这些文件都不是本应用列出的 BIOS（按名称、RetroBIOS 别名或校验和）。",
    "To install a BIOS under a name of your own, use": "要用自定义名称安装 BIOS，请使用",
    "in the BIOS manager of the system.": "（在机种的 BIOS 管理器中）。",
    "Ignored:": "已忽略：",
    "Reading the files …": "正在读取文件 …",
    "Looking inside the files (joined / split / interleaved dumps) …": "正在检查文件内部（合并 / 拆分 / 交错 dump）…",
    "Rebuilding": "正在重建",
    "Matching file": "匹配文件",
    "of": "共",
    "COULD NOT READ THE GAME FILE": "无法读取游戏文件",
    "EMULATOR FILES COULD NOT LOAD": "模拟器文件无法加载",
    "THE CORE TOOK TOO LONG TO START": "核心启动超时",
    "Possible causes: missing BIOS · wrong system for this file · unsupported ROM format · core needs WebGL2/threads.<br>Everything runs locally — no download is attempted. Press <b>ESC</b> to go back.":
      "可能原因：缺少 BIOS · 文件机种不对 · 不支持的 ROM 格式 · 核心需要 WebGL2 / 多线程。<br>一切都在本地运行 — 不会尝试下载。按 <b>ESC</b> 返回。",
    "RESUMED FROM LAST SESSION · use RESET GAME in the control center to start over":
      "已从上次会话继续 · 在控制中心使用“重置游戏”可重新开始",
    "BIOS files for": "BIOS 文件：",
    "are managed from the BIOS button in the library.": "可从游戏库的 BIOS 按钮管理。",
    "Hold": "按住",
    "on your gamepad and press START to quit a game.": "（手柄）再按 START 可退出游戏。",
    "Press F2 to save a state and F4 to load it back — 9 slots available (F6/F7).": "按 F2 存档、F4 读档 — 共 9 个槽位（F6/F7 切换）。",
    "Hold SPACE to fast-forward, F9 to rewind (enable Rewind in settings).": "按住空格快进，F9 回退（需在设置中开启回退）。",
    "Press CTRL+F12 or": "按 CTRL+F12 或",
    "in game to open the Control Center.": "+ B 打开控制中心。",
    "in game to open the Control Center.": "+ B 打开控制中心。",
    "Save states are kept inside the app — turn on Auto save/load in settings to resume where you left.":
      "存档保存在应用内 — 开启设置中的自动存档/读档即可从上次位置继续。",
    "Press F8 to take a screenshot; it becomes the game's box art in the library.": "按 F8 截图；它会成为游戏库中的封面。",
    "Use the in-game Settings (F1) to pick a shader, remap controls or change the core options.":
      "使用游戏内设置 (F1) 选择着色器、重映射按键或修改核心选项。",
    "Hold F9 / HOTKEY+←": "按住 F9 / 热键+←",
    "Do you want to save the current state before quitting?": "退出前要保存当前状态吗？",
    "SAVE & QUIT": "保存并退出",
    "QUIT WITHOUT SAVING": "不保存直接退出",
    "SAVE STATE & EXIT": "保存状态并退出",

    /* ---------- help / about ---------- */
    "SYSTEM VIEW": "机种页",
    "GAME VIEW": "游戏页",
    "GAMEPAD (MENUS)": "手柄（菜单）",
    "IN GAME": "游戏中",
    "MOVE · ENTER OPEN · F SEARCH ALL GAMES · S SETTINGS · B BIOS MANAGER · H THIS HELP":
      "移动 · 回车 打开 · F 搜索全部游戏 · S 设置 · B BIOS 管理器 · H 本帮助",
    "MOVE · ENTER PLAY · SPACE GAME OPTIONS · I GAME INFO · F FILTER · R RANDOM GAME · O CHANGE SORT · V GRID/LIST · TAB SYSTEM LIST · ESC BACK · DROP FILES ANYWHERE TO ADD":
      "移动 · 回车 开始 · 空格 游戏选项 · I 游戏信息 · F 筛选 · R 随机游戏 · O 切换排序 · V 网格/列表 · TAB 机种列表 · ESC 返回 · 拖入文件即可添加",
    "D-PAD / LEFT STICK MOVE · A OPEN · B BACK · X GAME OPTIONS · Y SEARCH · START SETTINGS · L1/R1 CHANGE SYSTEM":
      "方向键 / 左摇杆 移动 · A 打开 · B 返回 · X 游戏选项 · Y 搜索 · START 设置 · L1/R1 切换机种",
    "F1 EMULATOR MENU · F2 SAVE · F4 LOAD · F6/F7 SLOT · F8 SCREENSHOT · F9 REWIND · SPACE FAST-FORWARD (F10 on computer systems) · P PAUSE · F11 FULLSCREEN · CTRL+F12 CONTROL CENTER · ESC QUIT — GAMEPAD: HOLD":
      "F1 模拟器菜单 · F2 存档 · F4 读档 · F6/F7 槽位 · F8 截图 · F9 回退 · 空格 快进（电脑机种为 F10）· P 暂停 · F11 全屏 · CTRL+F12 控制中心 · ESC 退出 — 手柄：按住",
    "BUTTON": "键",
    "BUTTONS": "键",
    "ON/OFF": "开/关",
    "ON": "开",
    "OFF": "关"
  };

  /* ============================ runtime ============================ */
  var DICT = { "zh-CN": ZH };

  /* Rules for strings assembled at runtime (counts, "Controls for NES" …).
     They are matched on the trimmed text of a text node / attribute, so the
     English word order of the template stays in the code and only the result
     is localised. $1…$n are the capture groups. */
  var RULES = [
    /* value row of the settings menu: “◀ Disabled ▶” */
    [/^◀ (.+) ▶$/, function (m, a) { return "◀ " + tr(a) + " ▶"; }],
    [/^tattoo for (.+)$/, "操作说明：$1"],
    [/^— (\d+)\/(\d+) installed$/, "— $1/$2 已安装"],
    [/^· (.+) · (\d+) · core:$/, "· $1 · $2 · 核心："],
    [/^· (.+) · (\d+) · core: (.+)$/, "· $1 · $2 · 核心：$3"],
    [/^core:$/, "核心："],
    [/^CONTROLS · (.+)$/, "操作说明 · $1"],
    [/^slot (\d+)$/, "槽位 $1"],
    [/^Press CTRL\+F12 or (.+) \+ B in game to open the Control Center\.?$/, "按 CTRL+F12 或 $1 + B 打开控制中心。"],
    [/^Hold (.+) on your gamepad and press START to quit a game\.$/, "按住 $1（手柄）再按 START 可退出游戏。"],
    [/^BIOS files for (.+) are managed from the BIOS button in the library\.$/, "$1 的 BIOS 文件可从游戏库的 BIOS 按钮管理。"],
    [/^played (\d+)× · this session (.+) · total (.+) · rewind (on|off) · shader (.+)$/, function (m, n, a, b, rw, sh) {
      return "已玩 " + n + "× · 本次 " + a + " · 总计 " + b + " · 回退" + (rw === "on" ? "开" : "关") + " · 着色器 " + (sh === "off" ? "关" : sh);
    }],
    [/^· SELECT\+START or ESC to quit · CTRL\+F12 control center$/, "· SELECT+START 或 ESC 退出 · CTRL+F12 控制中心"],
    [/^(.+) · SELECT\+START or ESC to quit · CTRL\+F12 control center$/, "$1 · SELECT+START 或 ESC 退出 · CTRL+F12 控制中心"],
    [/^HOTKEYS \(KEYBOARD\)$/, "快捷键（键盘）"],
    [/^mounting library \.{2,} (\d+) games?(?: · (\d+) free)?$/, function (m, n, free) {
      return "挂载游戏库 ...... " + n + " 个游戏" + (free ? " · " + free + " 个免费" : "");
    }],
    [/^loading emulators \.{3,} (\d+)\/(\d+) cores?(.*)$/, function (m, a, b, rest) {
      var r = String(rest || "").replace(/ · offline ready/, " · 离线就绪").replace(/^ · (\d+) missing$/, " · 缺少 $1 个");
      return "加载模拟器 ..... " + a + "/" + b + " 个核心" + r;
    }],
    [/^SYSTEMS: (\d+) · GAMES: (\d+)( · BIOS: (\d+))?$/, function (m, s, g, x, b) {
      return "机种：" + s + " · 游戏：" + g + (b ? " · BIOS：" + b : "");
    }],
    [/^(\d+) GAMES? · (\d+) SYSTEMS$/, "$1 个游戏 · $2 个机种"],
    [/^GAMES? · SORT:$/, "个游戏 · 排序："],
    [/^GAMES? · FILTER:$/, "个游戏 · 筛选："],
    [/^· SORT:$/, "· 排序："],
    [/^· PLAYED$/, "· 已玩"],
    [/^· LAST$/, "· 最近"],
    [/^× · TIME$/, "× · 时长"],
    [/^· TIME$/, "· 时长"],
    [/^(\d+)-(\d+) PLAYERS?$/, "$1-$2 人"],
    [/^Current: (.+)$/, "当前：$1"],
    [/^Bundled cores \(offline\)( — .+)?$/, function (m, rest) { return "内置核心（离线）" + (rest ? tr(rest.trim()) : ""); }],
    [/^(\d+)\/(\d+) installed$/, "$1/$2 已安装"],
    [/^played (\d+)× · (.+)$/, "已玩 $1× · $2"],
    [/^(.+) · played (\d+)× · (.+)$/, function (m, a, n, b) { return a + " · 已玩 " + n + "× · " + b; }],
    [/^ADD$/, "添加"],
    [/^GAME$/, "游戏"],
    [/^GAMES$/, "游戏"],
    [/^games?$/, "个游戏"],
    [/^SYSTEM$/, "机种"],
    [/^OPEN$/, "打开"],
    [/^PLAY$/, "开始"],
    [/^OPTIONS$/, "选项"],
    [/^FILTER$/, "筛选"],
    [/^BACK$/, "返回"],
    [/^INFO$/, "信息"],
    [/^SAVE$/, "存档"],
    [/^LOAD$/, "读档"],
    [/^SHOT$/, "截图"],
    [/^MENU$/, "菜单"],
    [/^QUIT$/, "退出"],
    [/^HELP$/, "帮助"],
    [/^SEARCH$/, "搜索"],
    [/^SETTINGS$/, "设置"],
    [/^SORT$/, "排序"],
    [/^VIEW$/, "视图"],
    [/^RANDOM$/, "随机"],
    [/^ALL GAMES$/, "全部游戏"],
    [/^FAVORITES$/, "收藏"],
    [/^RECENTLY PLAYED$/, "最近玩过"],
    [/^(\d+) GAMES? · (\d+) SYSTEMS?$/, "$1 个游戏 · $2 个机种"],
    [/^(\d+) GAMES?$/, "$1 个游戏"],
    [/^(\d+) SYSTEMS?$/, "$1 个机种"],
    [/^(\d+) FILES?$/, "$1 个文件"],
    [/^(\d+) PLAYERS?$/, "$1 人"],
    [/^(\d+) GAME · (\d+) SYSTEMS$/, "$1 个游戏 · $2 个机种"],
    [/^(\d+) GAME · (\d+) SYSTEMS?$/, "$1 个游戏 · $2 个机种"],
    [/^SLOT (\d+)$/, "槽位 $1"],
    [/^SLOT (\d+) · (.+)$/, "槽位 $1 · $2"],
    [/^STATE SAVED · SLOT (\d+)$/, "存档已保存 · 槽位 $1"],
    [/^STATE LOADED · SLOT (\d+)$/, "存档已读取 · 槽位 $1"],
    [/^NO SAVED STATE IN SLOT (\d+)$/, "槽位 $1 没有存档"],
    [/^(\d+) OF (\d+) GAME FILES ARE MISSING OR WRONG$/, "$2 个游戏文件中有 $1 个缺失或校验错误"],
    [/^(\d+) OF (\d+) GAME FILES ARE MISSING$/, "$2 个游戏文件中有 $1 个缺失"],
    [/^(\d+) OF (\d+) GAME FILES ARE FROM ANOTHER VERSION$/, "$2 个游戏文件中有 $1 个来自其他版本"],
    [/^BIOS (.+)\.zip installed ✓$/, "BIOS $1.zip 已安装 ✓"],
    [/^BIOS (.+)\.zip installed$/, "BIOS $1.zip 已安装"],
    [/^parent (.+)\.zip present ✓$/, "父集 $1.zip 已存在 ✓"],
    [/^needs (.+)$/i, "需要 $1"],
    [/^NEEDS (.+)$/, "需要 $1"],
    [/^CORE (.+)$/, "核心 $1"],
    [/^BIOS (MISSING|NEEDED.*|NEEDS.*)$/, function (m, a) {
      var v = a === "MISSING" ? "缺失" : a.indexOf("NEEDED") === 0 ? "需要 · " + a.replace(/^NEEDED( · )?/, "") : a;
      return "BIOS " + v;
    }],
    [/^BIOS (\d+)\/(\d+)$/, "BIOS $1/$2"],
    [/^BIOS (OK|MISSING|NEEDED)$/, function (m, a) {
      return "BIOS " + (a === "OK" ? "正常" : a === "MISSING" ? "缺失" : "需要");
    }],
    [/^Controls for (.+)$/, "操作说明：$1"],
    [/^CONTROLS for (.+)$/, "操作说明：$1"],
    [/^Controls (.+)$/, "操作说明：$1"],
    [/^Add as (.+)$/, "添加为 $1"],
    [/^Add the game and install (.+) now$/, "添加游戏并立即安装 $1"],
    [/^Add the game and replace (.+)$/, "添加游戏并替换 $1"],
    [/^Add the game, install (.+) later$/, "先添加游戏，稍后安装 $1"],
    [/^Add the rebuilt (.+)$/, "添加重建后的 $1"],
    [/^Add it anyway \((\d+) missing\)$/, "仍然添加（缺 $1 个）"],
    [/^Replace (?:the game )?with (?:the )?(?:partly )?rebuilt (?:zip)?(.+)$/, "替换为重建后的 $1"],
    [/^Install (\d+) files?(.*)$/, "安装 $1 个文件$2"],
    [/^Install all (\d+)(.*)$/, "全部安装 $1 个$2"],
    [/^(\d+) already installed will be replaced$/, "$1 个已安装的将被替换"],
    [/^(\d+) verified against RetroBIOS checksums$/, "$1 个已通过 RetroBIOS 校验"],
    [/^(\d+) ignored \(not a BIOS this app lists\)$/, "已忽略 $1 个（不是本应用列出的 BIOS）"],
    [/^(\d+) files? checked$/, "已检查 $1 个文件"],
    [/^(\d+) files? recognised$/, "识别出 $1 个文件"],
    [/^BIOS IMPORT · (.+) RECOGNISED$/, "BIOS 导入 · 识别出 $1"],
    [/^BIOS IMPORT · (.+)$/, "BIOS 导入 · $1"],
    [/^MISSING BIOS CHECK$/, "缺失 BIOS 检查"],
    [/^(\d+) required · (\d+) optional.*$/, "$1 个必需 · $2 个可选"],
    [/^(\d+) cores? bundled · (.+)$/, "$1 个核心内置 · $2"],
    [/^(\d+)\/(\d+) cores? installed$/, "$1/$2 个核心已安装"],
    [/^loading library ……? (\d+) games?.*$/, "挂载游戏库 ...... $1 个游戏"],
    [/^(\d+) min ago$/, "$1 分钟前"],
    [/^(\d+) h ago$/, "$1 小时前"],
    [/^(\d+) d ago$/, "$1 天前"],
    [/^(\d+)s$/, "$1 秒"],
    [/^(\d+) min$/, "$1 分钟"],
    [/^(\d+) h (\d+) min$/, "$1 小时 $2 分钟"],
    [/^STOPPED? (.+)$/, "已停止 $1"],
    [/^(.+) — (.+)$/, function (m, a, b) { return tr(a) + " — " + tr(b); }]
  ];

  var state = { locale: "en-US", dict: null, missing: [] };

  function normalize(lang) {
    if (!lang || lang === "auto") return null;
    var l = String(lang).replace("_", "-").toLowerCase();
    if (l === "zh" || l.indexOf("zh-") === 0) return "zh-CN";
    if (l === "en" || l.indexOf("en-") === 0) return "en-US";
    return l;
  }
  function systemLocale() {
    var l = navigator.language || "en-US";
    return normalize(l) || "en-US";
  }
  function detect(preference) {
    var n = normalize(preference);
    if (n) return DICT[n] ? n : "en-US";
    return systemLocale();
  }
  function interpolate(s, vars) {
    if (!vars) return s;
    return String(s).replace(/\{(\w+)\}/g, function (m, k) {
      return vars[k] === undefined || vars[k] === null ? m : String(vars[k]);
    });
  }
  function t(s, vars) {
    if (s === undefined || s === null) return "";
    s = String(s);
    var tr = state.dict && Object.prototype.hasOwnProperty.call(state.dict, s) ? state.dict[s] : null;
    if (state.locale !== "en-US" && tr === null && /[A-Za-z]{2}/.test(s) && !/[\u4e00-\u9fff]/.test(s)) state.missing.push(s);
    return interpolate(tr === null ? s : tr, vars);
  }
  /* plural helper: tc(n, "{n} game", "{n} games") */
  function tc(n, one, other, vars) {
    var v = Object.assign({ n: n }, vars || {});
    return t(n === 1 ? one : other, v);
  }
  /* Controllers “tattoo” strings are built once in app.js as
     “ARROWS = D-PAD · Z = B · ENTER = START …”; translate the glossary here so
     the 23 per-system layouts do not need a dictionary entry each. */
  var CTRL = [
    ["ANALOG STICK", "摇杆"], ["LEFT STICK", "左摇杆"], ["RIGHT STICK", "右摇杆"],
    ["TOUCH SCREEN", "触摸屏"], ["C-BUTTONS", "C 按键"], ["Z-TRIGGER", "Z 扳机"],
    ["INSERT COIN", "投币"], ["CROSS", "×"], ["CIRCLE", "○"], ["SQUARE", "□"], ["TRIANGLE", "△"],
    ["LEFT D-PAD", "左十字键"], ["RIGHT D-PAD", "右十字键"], ["D-PAD", "十字键"],
    ["ARROWS", "方向键"], ["JOYSTICK", "摇杆"], ["KEYBOARD", "键盘"], ["MOUSE", "鼠标"],
    ["ENTER", "回车"], ["START", "开始"], ["SELECT", "选择"], ["PAUSE", "暂停"],
    ["RESET", "重置"], ["FIRE", "射击"], ["OPTION", "选项"], ["MODE", "模式"],
    ["RETURN", "回车"], ["RUN", "运行"], ["ANALOG", "摇杆"], ["TOUCH", "触摸"]
  ];
  function glossary(s) {
    for (var i = 0; i < CTRL.length; i++) {
      s = s.split(CTRL[i][0]).join(CTRL[i][1]);
    }
    return s;
  }
  function translateControls(s) {
    return s.split(" · ").map(function (part) {
      var m = /^(.+?) = (.+)$/.exec(part);
      if (!m) return glossary(part);
      return glossary(m[1]) + " = " + glossary(m[2]);
    }).join(" · ");
  }
  /* “SELECT + START = QUIT · SELECT + B = CONTROL CENTER …” */
  var PAD_ACTIONS = {
    "START = QUIT": "START = 退出",
    "B = CONTROL CENTER": "B = 控制中心",
    "A = PAUSE": "A = 暂停",
    "Y = SAVE STATE": "Y = 存档",
    "X = LOAD STATE": "X = 读档",
    "↑/↓ = SLOT +/−": "↑/↓ = 槽位 +/−",
    "← = REWIND": "← = 回退",
    "→ = FAST-FORWARD": "→ = 快进",
    "R3 = SCREENSHOT": "R3 = 截图"
  };
  function hotkeyLine(s) {
    return s.split(" · ").map(function (p) {
      var m = /^(.+?) \+ (.+)$/.exec(p);
      if (!m) return p;
      return m[1] + " + " + (PAD_ACTIONS[m[2]] || m[2]);
    }).join(" · ");
  }
  function tr(s) {
    if (s === undefined || s === null) return "";
    s = String(s);
    var key = s.trim();
    if (!key) return s;
    if (state.dict && Object.prototype.hasOwnProperty.call(state.dict, key)) return state.dict[key];
    if (state.locale === "en-US") return s;
    if (/ \+ START = QUIT| \+ B = CONTROL CENTER/.test(key)) return hotkeyLine(key);
    for (var i = 0; i < RULES.length; i++) {
      var re = RULES[i][0], rep = RULES[i][1];
      if (re.test(key)) return key.replace(re, rep);
    }
    if (/ = /.test(key)) return translateControls(key);
    if (/[A-Za-z]{2}/.test(key) && !/[\u4e00-\u9fff]/.test(key)) state.missing.push(key);
    return s;
  }
  /* Walk text nodes + title/placeholder attributes and localise them in place.
     Called at the render boundaries (openModal, toast, list renders …). */
  function nodes(root) {
    root = root || document;
    if (!root || !root.querySelectorAll || state.locale === "en-US") return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var list = [], n;
    while ((n = walker.nextNode())) list.push(n);
    for (var i = 0; i < list.length; i++) {
      var node = list[i], parent = node.parentNode;
      if (!parent) continue;
      var tag = parent.nodeName;
      if (tag === "SCRIPT" || tag === "STYLE" || tag === "TEXTAREA") continue;
      if (parent.closest && parent.closest("[data-i18n]")) continue;
      if (parent.closest && parent.closest(".boot-logo, .h-logo, .kbd")) continue;
      var raw = node.nodeValue;
      var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(raw);
      var core = m[2];
      if (!core) continue;
      var out = tr(core);
      if (out !== core) node.nodeValue = m[1] + out + m[3];
    }
    var els = root.querySelectorAll("[title],[placeholder],[aria-label]");
    for (var k = 0; k < els.length; k++) {
      var el = els[k];
      ["title", "placeholder", "aria-label"].forEach(function (a) {
        var v = el.getAttribute(a);
        if (!v) return;
        if (state.dict && Object.prototype.hasOwnProperty.call(state.dict, v.trim())) el.setAttribute(a, state.dict[v.trim()]);
      });
    }
  }
  function setLocale(pref) {
    state.locale = detect(pref);
    state.dict = DICT[state.locale] || null;
    state.missing = [];
    document.documentElement.setAttribute("lang", state.locale);
    document.documentElement.setAttribute("data-locale", state.locale);
    return state.locale;
  }
  function apply(root) {
    root = root || document;
    var els = root.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      var el = els[i], key = el.getAttribute("data-i18n");
      el.textContent = t(key);
      var title = el.getAttribute("data-i18n-title");
      if (title) el.setAttribute("title", t(title));
      var ph = el.getAttribute("data-i18n-ph");
      if (ph) el.setAttribute("placeholder", t(ph));
    }
    if (document.title) document.title = t(document.title);
  }
  function missing() { return state.missing.slice(); }

  var api = {
    t: t, tc: tc, tr: tr, nodes: nodes, apply: apply, setLocale: setLocale, detect: detect,
    normalize: normalize, interpolate: interpolate, missing: missing,
    get locale() { return state.locale; },
    get dictionary() { return state.dict; }
  };

  /* Convenience global: callers can write t(...) directly. */
  global.I18N = api;
  global.t = t;
  global.tc = tc;
  global.tr = tr;
  global.setLocale = setLocale;

  /* Initialise as early as possible (before app.js runs). */
  setLocale(localStorage.getItem("rbw-language") || "auto");
})(window);
