        // --- UTILITIES ---
        function hexToRgb(hex) { let r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); return `${r}, ${g}, ${b}`; }
        function shadeColor(c, p) {
            let R=parseInt(c.substring(1,3),16),G=parseInt(c.substring(3,5),16),B=parseInt(c.substring(5,7),16);
            R=parseInt(R*(100+p)/100); G=parseInt(G*(100+p)/100); B=parseInt(B*(100+p)/100);
            R=(R<255)?R:255; G=(G<255)?G:255; B=(B<255)?B:255;
            return "#"+(R.toString(16).length==1?"0"+R.toString(16):R.toString(16))+(G.toString(16).length==1?"0"+G.toString(16):G.toString(16))+(B.toString(16).length==1?"0"+B.toString(16):B.toString(16));
        }
        function getFavicon(url) {
            try { const domain = new URL(url).hostname; return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`; }
            catch { return ''; }
        }

        // --- TRANSLATION ENGINE ---
        const translations = {
            en: {
                search_top: "Search the web freely... (Use !yt, !r, !w)", search_center: "Search the web or enter an address...",
                settings: "Browser Settings", history: "History", bookmarks: "Bookmarks",
                general: "General", appearance: "Appearance", stealth: "Stealth & Privacy", data: "Data",
                search_engine: "Search Engine & Startup", default_search: "Default Search Provider",
                startup_behavior: "Startup Behavior", opt_newtab: "Open the New Tab page", opt_continue: "Continue where you left off",
                language: "Display Language", sys_pref: "System Preferences", perf_mode: "Performance Mode",
                perf_desc: "Disables blur and heavy animations to boost speed.", proxy_engine: "Proxy Engine",
                display_scale: "Display Scaling", ui_font: "UI Font Size", theme_color: "Theme Color", custom_hex: "Custom Accent Color",
                bg_image: "Background Image", custom_upload: "Custom Base64 / Local Image Upload:",
                browse: "Browse Local File", custom_url: "Or paste direct image URL / Base64 Data:",
                apply: "Apply", panic_cloak: "Panic Protocol & Cloaking", panic_key: "Panic Key (Press to instantly leave)",
                panic_dest: "Panic Destination URL", disguise: "Disguise Browser As (Tab Cloaking):",
                anti_close: "Anti-Close", anti_close_desc: "Prevent accidental tab closure", save_stealth: "Save Stealth Config",
                adv_privacy: "Advanced Privacy Controls", clear_exit: "Clear Data on Exit", clear_exit_desc: "Wipes history and cookies when closing tab",
                adblocker: "Built-in Adblocker", sync_backup: "Sync & Backup", sync_desc: "Export your bookmarks, history, apps, and preferences to a file, or import them onto another device.",
                export: "Export Data", import: "Import Data", local_data: "Local Data Management",
                local_desc: "Manage your stored history, bookmarks, base64 images, and custom apps.", clear_history: "Clear Browsing History",
                factory_reset: "Factory Reset Browser", clear_all: "Clear All", new_tab: "New Tab", games: "Games", add_shortcut: "Add Shortcut",
                duplicate_tab: "Duplicate Tab", close_other: "Close Other Tabs", pin_tab: "Pin Tab", unpin_tab: "Unpin Tab",
                notes: "Notepad", notes_placeholder: "Jot down something quick... (Auto-saves)", enter_pin: "Enter PIN", unlock: "Unlock", pin_lock_title: "Browser PIN Lock",
                mute_tab: "Mute Tab", unmute_tab: "Unmute Tab", sleep_tab: "Sleep Tab (Save RAM)", wake_tab: "Wake Tab",
                hub_custom: "Hub Customization", hub_title: "Hub Title Text", custom_css: "Custom CSS (Power Users)",
                clock_format: "Clock Format", format_12h: "12-Hour (AM/PM)", format_24h: "24-Hour",
                search_history: "Search history...", search_bookmarks: "Search bookmarks...",
                copy_url: "Copy URL", close_all_tabs: "Close All Tabs", ui_opacity: "Browser Opacity (Stealth)", ui_opacity_desc: "Lower opacity to blend into background."
            },
            es: {
                search_top: "Busca en la web libremente... (!yt, !r, !w)", search_center: "Busca en la web o introduce una dirección...",
                settings: "Configuración", history: "Historial", bookmarks: "Marcadores",
                general: "General", appearance: "Apariencia", stealth: "Sigilo y Privacidad", data: "Datos",
                search_engine: "Buscador y Inicio", default_search: "Buscador Predeterminado",
                startup_behavior: "Comportamiento al Iniciar", opt_newtab: "Abrir Nueva Pestaña", opt_continue: "Continuar donde lo dejaste",
                language: "Idioma", sys_pref: "Preferencias del Sistema", perf_mode: "Modo Rendimiento",
                perf_desc: "Desactiva animaciones pesadas para aumentar la velocidad.", proxy_engine: "Motor Proxy",
                display_scale: "Escala de Pantalla", ui_font: "Tamaño de Letra", theme_color: "Color del Tema", custom_hex: "Color Personalizado",
                bg_image: "Imagen de Fondo", custom_upload: "Subir Imagen Local / Base64:",
                browse: "Buscar Archivo Local", custom_url: "O pegar URL de imagen / Datos Base64:",
                apply: "Aplicar", panic_cloak: "Protocolo de Pánico y Camuflaje", panic_key: "Tecla de Pánico",
                panic_dest: "URL de Destino de Pánico", disguise: "Disfrazar Navegador Como:",
                anti_close: "Anti-Cierre", anti_close_desc: "Prevenir cierre accidental de pestaña", save_stealth: "Guardar Config.",
                adv_privacy: "Controles de Privacidad", clear_exit: "Borrar Datos al Salir", clear_exit_desc: "Borra historial y cookies al cerrar",
                adblocker: "Bloqueador de Anuncios", sync_backup: "Sincronización y Respaldo", sync_desc: "Exporta o importa tus datos de navegación.",
                export: "Exportar Datos", import: "Importar Datos", local_data: "Gestión de Datos Locales",
                local_desc: "Gestiona tu historial, marcadores y aplicaciones.", clear_history: "Borrar Historial",
                factory_reset: "Restaurar de Fábrica", clear_all: "Borrar Todo", new_tab: "Nueva Pestaña", games: "Juegos", add_shortcut: "Añadir Atajo",
                duplicate_tab: "Duplicar Pestaña", close_other: "Cerrar Otras Pestañas", pin_tab: "Fijar pestaña", unpin_tab: "Desfijar pestaña",
                notes: "Bloc de notas", notes_placeholder: "Escribe algo rápido... (Guardado automático)", enter_pin: "Introduce el PIN", unlock: "Desbloquear", pin_lock_title: "Bloqueo por PIN",
                mute_tab: "Silenciar Pestaña", unmute_tab: "Activar Sonido", sleep_tab: "Suspender Pestaña", wake_tab: "Despertar Pestaña",
                hub_custom: "Personalización", hub_title: "Título de la Nueva Pestaña", custom_css: "CSS Personalizado",
                clock_format: "Formato de Reloj", format_12h: "12 Horas (AM/PM)", format_24h: "24 Horas",
                search_history: "Buscar en historial...", search_bookmarks: "Buscar marcadores...",
                copy_url: "Copiar URL", close_all_tabs: "Cerrar Todas las Pestañas", ui_opacity: "Opacidad del Navegador", ui_opacity_desc: "Reduce la opacidad para camuflarse."
            },
            fr: {
                search_top: "Recherchez sur le web librement...", search_center: "Recherchez sur le web ou entrez une adresse...",
                settings: "Paramètres", history: "Historique", bookmarks: "Favoris",
                general: "Général", appearance: "Apparence", stealth: "Furtivité & Confidentialité", data: "Données",
                search_engine: "Moteur de recherche & Démarrage", default_search: "Moteur de recherche par défaut",
                startup_behavior: "Au démarrage", opt_newtab: "Ouvrir un nouvel onglet", opt_continue: "Reprendre là où vous en étiez",
                language: "Langue d'affichage", sys_pref: "Préférences Système", perf_mode: "Mode Performance",
                perf_desc: "Désactive les animations lourdes pour augmenter la vitesse.", proxy_engine: "Moteur Proxy",
                display_scale: "Mise à l'échelle", ui_font: "Taille de la police", theme_color: "Couleur du Thème", custom_hex: "Couleur personnalisée",
                bg_image: "Image de fond", custom_upload: "Téléchargement d'image locale / Base64 :",
                browse: "Parcourir", custom_url: "Ou coller l'URL de l'image / Données Base64 :",
                apply: "Appliquer", panic_cloak: "Protocolo de Panique & Masquage", panic_key: "Touche de Panique",
                panic_dest: "URL de destination de panique", disguise: "Déguiser le navigateur en :",
                anti_close: "Anti-Fermeture", anti_close_desc: "Empêcher la fermeture accidentelle", save_stealth: "Enregistrer",
                adv_privacy: "Contrôles de confidentialité", clear_exit: "Effacer les données à la sortie", clear_exit_desc: "Efface l'historique en fermant",
                adblocker: "Bloqueur de pubs", sync_backup: "Synchro & Sauvegarde", sync_desc: "Exportez ou importez vos données.",
                export: "Exporter", import: "Importer", local_data: "Gestion des données",
                local_desc: "Gérez votre historique, vos favoris et vos apps.", clear_history: "Effacer l'historique",
                factory_reset: "Réinitialisation d'usine", clear_all: "Tout Effacer", new_tab: "Nouvel Onglet", games: "Jeux", add_shortcut: "Ajouter",
                duplicate_tab: "Dupliquer l'onglet", close_other: "Fermer les autres", pin_tab: "Épingler l'onglet", unpin_tab: "Détacher l'onglet",
                notes: "Bloc-notes", notes_placeholder: "Notez quelque chose rapidement...", enter_pin: "Entrer le PIN", unlock: "Déverrouiller", pin_lock_title: "Verrouillage par PIN",
                mute_tab: "Mettre en sourdine", unmute_tab: "Réactiver le son", sleep_tab: "Mettre en veille", wake_tab: "Réveiller l'onglet",
                hub_custom: "Personnalisation", hub_title: "Titre du Hub", custom_css: "CSS Personnalisé",
                clock_format: "Format de l'horloge", format_12h: "12 Heures (AM/PM)", format_24h: "24 Heures",
                search_history: "Rechercher dans l'historique...", search_bookmarks: "Rechercher dans les favoris...",
                copy_url: "Copier l'URL", close_all_tabs: "Fermer tous les onglets", ui_opacity: "Opacité (Furtivité)", ui_opacity_desc: "Baissez l'opacité pour masquer le navigateur."
            },
            de: {
                search_top: "Frei im Web suchen...", search_center: "Im Web suchen oder Adresse eingeben...",
                settings: "Einstellungen", history: "Verlauf", bookmarks: "Lesezeichen",
                general: "Allgemein", appearance: "Aussehen", stealth: "Tarnung & Privatsphäre", data: "Daten",
                search_engine: "Suchmaschine & Start", default_search: "Standard-Suchmaschine",
                startup_behavior: "Verhalten beim Start", opt_newtab: "Neuen Tab öffnen", opt_continue: "Dort weitermachen, wo du warst",
                language: "Anzeigesprache", sys_pref: "Systemeinstellungen", perf_mode: "Leistungsmodus",
                perf_desc: "Deaktiviert Animationen, um die Geschwindigkeit zu erhöhen.", proxy_engine: "Proxy-Engine",
                display_scale: "Anzeigeskalierung", ui_font: "Schriftgröße", theme_color: "Themenfarbe", custom_hex: "Eigene Farbe",
                bg_image: "Hintergrundbild", custom_upload: "Lokales Bild hochladen / Base64:",
                browse: "Durchsuchen", custom_url: "Oder direkte Bild-URL / Base64 eingeben:",
                apply: "Anwenden", panic_cloak: "Panikprotokoll & Tarnung", panic_key: "Paniktaste",
                panic_dest: "Panik-Ziel-URL", disguise: "Browser tarnen als:",
                anti_close: "Anti-Schließen", anti_close_desc: "Versehentliches Schließen verhindern", save_stealth: "Speichern",
                adv_privacy: "Erweiterter Datenschutz", clear_exit: "Daten beim Beenden löschen", clear_exit_desc: "Löscht Verlauf beim Schließen",
                adblocker: "Werbeblocker", sync_backup: "Sync & Backup", sync_desc: "Exportieren oder importieren Sie Ihre Browserdaten.",
                export: "Exportieren", import: "Importieren", local_data: "Lokale Datenverwaltung",
                local_desc: "Verwalten Sie Verlauf, Lesezeichen und Apps.", clear_history: "Verlauf löschen",
                factory_reset: "Auf Werkseinstellungen zurücksetzen", clear_all: "Alles löschen", new_tab: "Neuer Tab", games: "Spiele", add_shortcut: "Hinzufügen",
                duplicate_tab: "Tab duplizieren", close_other: "Andere Tabs schließen", pin_tab: "Tab anheften", unpin_tab: "Tab lösen",
                notes: "Notizblock", notes_placeholder: "Notiere dir schnell etwas...", enter_pin: "PIN eingeben", unlock: "Entsperren", pin_lock_title: "Browser-PIN-Sperre",
                mute_tab: "Tab stummschalten", unmute_tab: "Stummschaltung aufheben", sleep_tab: "Tab schlafen legen", wake_tab: "Tab aufwecken",
                hub_custom: "Anpassung", hub_title: "Hub-Titel", custom_css: "Benutzerdefiniertes CSS",
                clock_format: "Uhrzeitformat", format_12h: "12-Stunden (AM/PM)", format_24h: "24-Stunden",
                search_history: "Verlauf durchsuchen...", search_bookmarks: "Lesezeichen durchsuchen...",
                copy_url: "URL kopieren", close_all_tabs: "Alle Tabs schließen", ui_opacity: "Browser-Deckkraft", ui_opacity_desc: "Deckkraft verringern, um den Browser zu tarnen."
            },
            it: {
                search_top: "Cerca nel web liberamente...", search_center: "Cerca nel web o inserisci un indirizzo...",
                settings: "Impostazioni", history: "Cronologia", bookmarks: "Segnalibri",
                general: "Generale", appearance: "Aspetto", stealth: "Invisibilità e Privacy", data: "Dati",
                search_engine: "Motore di Ricerca", default_search: "Motore Predefinito",
                startup_behavior: "All'avvio", opt_newtab: "Apri Nuova Scheda", opt_continue: "Continua da dove avevi lasciato",
                language: "Lingua", sys_pref: "Preferenze di Sistema", perf_mode: "Modalità Prestazioni",
                perf_desc: "Disattiva le animazioni per aumentare la velocità.", proxy_engine: "Motore Proxy",
                display_scale: "Ridimensionamento", ui_font: "Dimensione Carattere", theme_color: "Colore Tema", custom_hex: "Colore Personalizzato",
                bg_image: "Immagine di Sfondo", custom_upload: "Carica immagine locale / Base64:",
                browse: "Sfoglia", custom_url: "O incolla URL / Dati Base64:",
                apply: "Applica", panic_cloak: "Protocolo Panico e Camuffamento", panic_key: "Tasto Panico",
                panic_dest: "URL di destinazione panico", disguise: "Camuffa Browser Come:",
                anti_close: "Anti-Chiusura", anti_close_desc: "Previeni chiusura accidentale", save_stealth: "Salva",
                adv_privacy: "Privacy Avanzata", clear_exit: "Cancella Dati all'Uscita", clear_exit_desc: "Elimina cookie e cronologia",
                adblocker: "Adblocker", sync_backup: "Sincronizzazione e Backup", sync_desc: "Esporta o importa i tuoi dati.",
                export: "Esporta", import: "Importa", local_data: "Gestione Dati Locali",
                local_desc: "Gestisci cronologia, segnalibri e app.", clear_history: "Cancella Cronologia",
                factory_reset: "Ripristino di Fabbrica", clear_all: "Cancella Tutto", new_tab: "Nuova Scheda", games: "Giochi", add_shortcut: "Aggiungi",
                duplicate_tab: "Duplica Scheda", close_other: "Chiudi Altre Schede", pin_tab: "Aggiungi scheda", unpin_tab: "Rimuovi scheda",
                notes: "Blocco note", notes_placeholder: "Annota qualcosa velocemente...", enter_pin: "Inserisci il PIN", unlock: "Sblocca", pin_lock_title: "Blocco con PIN",
                mute_tab: "Silenzia Scheda", unmute_tab: "Riattiva Audio", sleep_tab: "Sospendi Scheda", wake_tab: "Risveglia Scheda",
                hub_custom: "Personalizzazione", hub_title: "Titolo Hub", custom_css: "CSS Personalizzato",
                clock_format: "Formato Orologio", format_12h: "12 Ore (AM/PM)", format_24h: "24 Ore",
                search_history: "Cerca nella cronologia...", search_bookmarks: "Cerca nei segnalibri...",
                copy_url: "Copia URL", close_all_tabs: "Chiudi Tutte le Schede", ui_opacity: "Opacità Browser", ui_opacity_desc: "Riduci l'opacità per mimetizzarti."
            },
            ja: {
                search_top: "ウェブを自由に検索...", search_center: "ウェブを検索するかアドレスを入力...",
                settings: "設定", history: "履歴", bookmarks: "ブックマーク",
                general: "一般", appearance: "外観", stealth: "ステルスとプライバシー", data: "データ",
                search_engine: "検索エンジン", default_search: "デフォルトの検索",
                startup_behavior: "起動時の動作", opt_newtab: "新しいタブを開く", opt_continue: "前回開いていたページを開く",
                language: "表示言語", sys_pref: "システム環境設定", perf_mode: "パフォーマンスモード",
                perf_desc: "重いアニメーションを無効にして速度を上げます。", proxy_engine: "プロキシエンジン",
                display_scale: "ディスプレイスケーリング", ui_font: "フォントサイズ", theme_color: "テーマカラー", custom_hex: "カスタムカラー",
                bg_image: "背景画像", custom_upload: "ローカル画像のアップロード / Base64:",
                browse: "参照", custom_url: "または直接画像URL / Base64データ:",
                apply: "適用", panic_cloak: "パニックプロトコルとクローキング", panic_key: "パニックキー",
                panic_dest: "パニック時の移動先URL", disguise: "ブラウザの偽装:",
                anti_close: "閉じるのを防止", anti_close_desc: "誤ってタブを閉じるのを防ぐ", save_stealth: "保存",
                adv_privacy: "高度なプライバシー設定", clear_exit: "終了時にデータをクリア", clear_exit_desc: "タブを閉じるときに履歴を消去",
                adblocker: "広告ブロッカー", sync_backup: "同期とバックアップ", sync_desc: "データをエクスポートまたはインポートします。",
                export: "エクスポート", import: "インポート", local_data: "ローカルデータ管理",
                local_desc: "履歴、ブックマーク、アプリを管理します。", clear_history: "閲覧履歴を消去",
                factory_reset: "工場出荷時にリセット", clear_all: "すべてクリア", new_tab: "新しいタブ", games: "ゲーム", add_shortcut: "追加",
                duplicate_tab: "タブを複製", close_other: "他のタブを閉じる", pin_tab: "タブを固定", unpin_tab: "タブの固定を解除",
                notes: "メモ帳", notes_placeholder: "何か書き留めてください...", enter_pin: "PINを入力", unlock: "ロック解除", pin_lock_title: "ブラウザのPINロック",
                mute_tab: "タブをミュート", unmute_tab: "ミュート解除", sleep_tab: "タブをスリープ", wake_tab: "タブを起こす",
                hub_custom: "カスタマイズ", hub_title: "ハブのタイトル", custom_css: "カスタムCSS",
                clock_format: "時計の形式", format_12h: "12時間 (AM/PM)", format_24h: "24時間",
                search_history: "履歴を検索...", search_bookmarks: "ブックマークを検索...",
                copy_url: "URLをコピー", close_all_tabs: "すべてのタブを閉じる", ui_opacity: "ブラウザの不透明度", ui_opacity_desc: "背景に溶け込むように不透明度を下げます。"
            }
        };

        let currentLanguage = localStorage.getItem('endis_lang') || 'en';

        window.changeLanguage = function(lang) {
            currentLanguage = lang;
            localStorage.setItem('endis_lang', lang);
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang][key]) el.innerText = translations[lang][key];
            });
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if (translations[lang][key]) el.placeholder = translations[lang][key];
            });
            renderTabs(); setRandomMessage();
        }

        const randomMessages = {
            en: ["Welcome to the depths.", "Surfing the digital waves.", "Your private workspace.", "Fast, secure, and stealthy.", "Stay curious."],
            es: ["Bienvenido a las profundidades.", "Navegando las olas digitales.", "Tu espacio privado.", "Rápido, seguro y sigiloso.", "Mantente curioso."],
            fr: ["Bienvenue dans les profondeurs.", "Surfer sur les vagues numériques.", "Votre espace privé.", "Rapide, sécurisé et furtif.", "Restez curieux."],
            de: ["Willkommen in den Tiefen.", "Surfen auf den digitalen Wellen.", "Dein privater Arbeitsbereich.", "Schnell, sicher und getarnt.", "Bleib neugierig."],
            it: ["Benvenuto nelle profondità.", "Navigando le onde digitali.", "Il tuo spazio privato.", "Veloce, sicuro e furtivo.", "Resta curioso."],
            ja: ["深みへようこそ。", "デジタルの波に乗る。", "あなたのプライベート空間。", "高速、安全、そしてステルス。", "好奇心を保ちましょう。"]
        };

        function setRandomMessage() {
            const msgs = randomMessages[currentLanguage] || randomMessages['en'];
            document.getElementById('date').innerText = msgs[Math.floor(Math.random() * msgs.length)];
        }

        function updateClock() {
            const now = new Date();
            const clockFmt = localStorage.getItem('endis_clock_format') || '12';
            let h = now.getHours(), m = now.getMinutes();
            if (clockFmt === '12') {
                const ampm = h >= 12 ? ' PM' : ' AM';
                h = h % 12; h = h ? h : 12; // the hour '0' should be '12'
            } else {
                h = h < 10 ? '0' + h : h;
            }
            m = m < 10 ? '0' + m : m;
            document.getElementById('clock').innerText = customHubTitle !== 'sea bean' ? customHubTitle : `${h}:${m}`;

            const dateStr = now.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : currentLanguage, { weekday: 'long', month: 'long', day: 'numeric' });

            // Only update date if we are showing time, else show message
            if (customHubTitle === 'sea bean' || customHubTitle === '') {
                document.getElementById('clock').innerText = `${h}:${m}`;
                document.getElementById('date').innerText = dateStr;
            }
        }

        // --- STATE & DATA ---
        let currentTheme = localStorage.getItem('endis_theme') || 'wine';
        let currentBgId = localStorage.getItem('endis_bg_id') || 'none';
        let customBgUrl = localStorage.getItem('endis_custom_bg') || '';
        let currentSearch = localStorage.getItem('endis_search') || 'duckduckgo';
        let startupBehavior = localStorage.getItem('endis_startup') || 'newtab';
        let currentProxyEngine = localStorage.getItem('endis_proxy_engine') || 'ultraviolet';
        const proxyRouteMap = { ultraviolet: '/wave?engine=ultraviolet', scramjet: '/chat?engine=scramjet', rhodium: '/chat?engine=rhodium' };

        let panicKey = localStorage.getItem('seaHotkey') || '`';
        let panicUrlStr = localStorage.getItem('seaPanicUrl') || 'https://classroom.google.com';
        let isAntiClose = localStorage.getItem('seaAntiClose') === 'true';
        let currentCloak = localStorage.getItem('seaCloak') || 'default';
        let clearOnExit = localStorage.getItem('seaClearOnExit') === 'true';
        let isPerformanceMode = localStorage.getItem('endis_perf_mode') === 'true';
        let currentFontSize = localStorage.getItem('endis_font_size') || '14px';
        let customHubTitle = localStorage.getItem('endis_hub_title') || 'sea bean';
        let userCustomCSS = localStorage.getItem('endis_custom_css') || '';
        let customSearchUrl = localStorage.getItem('endis_custom_search_url') || '';
        let currentUiOpacity = localStorage.getItem('endis_ui_opacity') || '1';

        const extensionCatalog = [
            { id: 'smartSuggest', name: 'Smart Suggestions', icon: 'sparkles', desc: 'Shows URL and search suggestions while typing.', enabledByDefault: true },
            { id: 'quickCalc', name: 'Quick Calculator', icon: 'calculator', desc: 'Evaluates math expressions right in the address bar.', enabledByDefault: true },
            { id: 'zenUi', name: 'Zen UI', icon: 'leaf', desc: 'Hides extra status indicators for a cleaner browser look.', enabledByDefault: false }
        ];
        let extensionState = JSON.parse(localStorage.getItem('endis_extensions') || '{}');
        extensionCatalog.forEach(ext => {
            if (typeof extensionState[ext.id] !== 'boolean') extensionState[ext.id] = ext.enabledByDefault;
        });


        let isLocked = localStorage.getItem('endis_pin_enabled') === 'true';

        let browserHistory = JSON.parse(localStorage.getItem('endis_history')) || [];
        let bookmarks = JSON.parse(localStorage.getItem('endis_bookmarks')) || [];
        let customApps = JSON.parse(localStorage.getItem('endis_apps')) || [
            { name: 'Granite', url: 'https://latte-x.neocities.org/htmldeliver', icon: 'https://raw.githubusercontent.com/RampJavaScript/freerobuxnoscam100percent/main/granite.png.png' },
            { name: 'GitHub', url: 'https://github.com', icon: 'https://www.google.com/s2/favicons?domain=github.com&sz=64' },
            { name: 'Discord', url: 'https://discord.com/app', icon: 'https://www.google.com/s2/favicons?domain=discord.com&sz=64' },
            { name: 'NowGG', url: 'https://nowgg.fun', icon: 'https://www.google.com/s2/favicons?domain=nowgg.fun&sz=64' }
        ];

        let tabs = []; let activeTabId = null;
        let closedTabsHistory = [];
        let contextTargetTabId = null;
        let splitView = { enabled: false, leftId: null, rightId: null };
        let isMusicDrawerOpen = localStorage.getItem('endis_music_drawer') === 'true';

        function setSplitViewState(enabled, leftId = null, rightId = null) {
            splitView = { enabled, leftId, rightId };
            document.body.classList.toggle('split-active', !!enabled);
            if (enabled && document.body.classList.contains('focus-mode')) {
                document.body.classList.remove('focus-mode');
            }
        }

        // --- INIT ---
        function initBrowser() {
            lucide.createIcons();

            if (isLocked) { document.getElementById('lock-screen-overlay').style.display = 'flex'; }

            initSettingsUI();
            renderExtensionsUI();
            renderHubApps();
            renderHistory();
            renderBookmarks();
            window.updateFontSize(currentFontSize, false);
            window.updateUiOpacity(currentUiOpacity);
            if(isPerformanceMode) { document.body.classList.add('performance-mode'); }
            window.changeLanguage(currentLanguage);
            if (isMusicDrawerOpen) document.getElementById('music-drawer').classList.add('open');

            document.getElementById('hub-notes').value = localStorage.getItem('endis_notes') || '';

            if (startupBehavior === 'continue') {
                let saved = JSON.parse(localStorage.getItem('endis_session') || '[]');
                if (saved.length > 0) {
                    saved.forEach(s => {
                        const newId = WaveEngine.createSurface();
                        tabs.push({ id: newId, url: s.url, title: s.title, isRaw: s.isRaw, incognito: false, pinned: s.pinned || false, muted: s.muted || false, sleeping: s.sleeping || false });
                        if(s.url && !s.sleeping) WaveEngine.navigate(newId, s.url, s.isRaw);
                    });
                    window.switchTab(tabs[tabs.length-1].id);
                } else { window.addTab(); }
            } else { window.addTab(); }

            // Global Clicks
            document.addEventListener('click', (e) => {
                document.getElementById('tab-context-menu').style.display = 'none';
                if(!e.target.closest('.address-bar')) document.getElementById('topSuggestions').style.display = 'none';
                if(!e.target.closest('.hub-search')) document.getElementById('centerSuggestions').style.display = 'none';
            });

            setInterval(updateClock, 1000); updateClock();

            // Battery API
            if ('getBattery' in navigator) {
                navigator.getBattery().then(function(battery) {
                    updateBatteryUI(battery);
                    battery.addEventListener('levelchange', () => updateBatteryUI(battery));
                    battery.addEventListener('chargingchange', () => updateBatteryUI(battery));
                });
            }
        }

        function updateBatteryUI(battery) {
            const el = document.getElementById('battery-status');
            const level = Math.round(battery.level * 100);
            const icon = battery.charging ? 'battery-charging' : (level > 20 ? 'battery' : 'battery-warning');
            el.innerHTML = `<i data-lucide="${icon}" style="width: 14px;"></i> ${level}%`;
            lucide.createIcons();
        }

        window.unlockBrowser = function() {
            const input = document.getElementById('unlock-pin-input').value;
            const correctPin = localStorage.getItem('endis_pin');
            if (input === correctPin || correctPin === '') {
                document.getElementById('lock-screen-overlay').style.display = 'none';
                isLocked = false;
                window.showToast('Unlocked successfully', 'success');
            } else {
                window.showToast('Incorrect PIN', 'error');
                document.getElementById('unlock-pin-input').value = '';
            }
        }

        window.saveNotes = function(val) { localStorage.setItem('endis_notes', val); }

        window.updateHubTitle = function(val) {
            customHubTitle = val || 'sea bean';
            localStorage.setItem('endis_hub_title', customHubTitle);
            updateClock();
            window.showToast('Hub Title Updated', 'success');
        }

        window.applyCustomCSS = function(val) {
            userCustomCSS = val;
            localStorage.setItem('endis_custom_css', val);
            document.getElementById('user-custom-css').innerHTML = val;
            window.showToast('Custom CSS Applied', 'success');
        }

        window.updateCustomSearch = function(val) {
            customSearchUrl = val;
            localStorage.setItem('endis_custom_search_url', val);
        }

        // --- UI & MODALS ---
        window.openModal = function(id) {
            const overlay = document.getElementById(id);
            overlay.style.display = 'flex';
            setTimeout(() => { overlay.style.opacity = '1'; overlay.querySelector('.modal-box').style.transform = 'scale(1)'; }, 10);
        }
        window.closeModal = function(id) {
            const overlay = document.getElementById(id);
            overlay.style.opacity = '0'; overlay.querySelector('.modal-box').style.transform = 'scale(0.95)';
            setTimeout(() => overlay.style.display = 'none', 300);
        }
        window.switchSettingTab = function(tabId, el) {
            document.querySelectorAll('.settings-nav-item').forEach(n => n.classList.remove('active'));
            document.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
            el.classList.add('active'); document.getElementById('tab-' + tabId).classList.add('active');
        }
        window.showToast = function(msg, type = 'info') {
            const container = document.getElementById('toast-container'); const t = document.createElement('div');
            t.className = `toast ${type}`; const i = {'success':'check-circle','warning':'alert-triangle','error':'x-circle','info':'info'};
            t.innerHTML = `<i data-lucide="${i[type]}" style="width:18px;"></i> ${msg}`; container.appendChild(t); lucide.createIcons();
            setTimeout(() => { t.style.animation = 'slideOut 0.4s ease forwards'; setTimeout(() => t.remove(), 400); }, 3000);
        }
        window.toggleFullscreen = function() {
            if (!document.fullscreenElement) { document.documentElement.requestFullscreen().catch(err => console.log(err)); }
            else { if (document.exitFullscreen) document.exitFullscreen(); }
        }

        window.toggleFocusMode = function() {
            document.body.classList.toggle('focus-mode');
            window.showToast(document.body.classList.contains('focus-mode') ? "Focus Mode Enabled (Press F4 to exit)" : "Focus Mode Disabled", "info");
        }

        window.cycleSearchEngine = function() {
            const engines = ['duckduckgo', 'google', 'bing', 'brave', 'yahoo', 'custom'];
            let idx = engines.indexOf(currentSearch);
            idx = (idx + 1) % engines.length;
            currentSearch = engines[idx];
            localStorage.setItem('endis_search', currentSearch);
            document.getElementById('search-engine-select').value = currentSearch;
            document.getElementById('customSearchInput').style.display = currentSearch === 'custom' ? 'block' : 'none';
            window.showToast("Search set to " + currentSearch.charAt(0).toUpperCase() + currentSearch.slice(1), "success");
        }

        window.clearAddressBar = function() {
            const input = document.getElementById('top-url');
            input.value = '';
            input.focus();
            document.getElementById('clear-url-btn').style.display = 'none';
            document.getElementById('topSuggestions').style.display = 'none';
        }

        // --- SETTINGS (THEMES & BACKGROUNDS) ---
        const themes = [
            { id: 'wine', name: 'Deep Blue', color: '#6590d9', bg: '#0e151c', g: 'linear-gradient(135deg, #3f65a4, #1c345e)' },
            { id: 'crimson', name: 'Crimson', color: '#f43f5e', bg: '#1c0f13', g: 'linear-gradient(135deg, #e11d48, #4c0519)' },
            { id: 'amethyst', name: 'Amethyst', color: '#a855f7', bg: '#170f1c', g: 'linear-gradient(135deg, #9333ea, #3b0764)' },
            { id: 'emerald', name: 'Emerald', color: '#10b981', bg: '#0f1c16', g: 'linear-gradient(135deg, #059669, #064e3b)' },
            { id: 'cyberpunk', name: 'Cyberpunk', color: '#facc15', bg: '#18181b', g: 'linear-gradient(135deg, #eab308, #713f12)' },
            { id: 'light', name: 'Light', color: '#60a5fa', bg: '#e2e8f0', g: 'linear-gradient(135deg, #93c5fd, #eff6ff)' },
            { id: 'midnight', name: 'Night', color: '#818cf8', bg: '#0b0d1a', g: 'linear-gradient(135deg, #6366f1, #1e1b4b)' },
            { id: 'ocean', name: 'Ocean', color: '#0ea5e9', bg: '#082f49', g: 'linear-gradient(135deg, #38bdf8, #0c4a6e)' },
            { id: 'obsidian', name: 'OLED', color: '#94a3b8', bg: '#000000', g: 'linear-gradient(135deg, #cbd5e1, #0f172a)' }
        ];


        const extraThemes = JSON.parse(localStorage.getItem('endis_extra_themes') || '[]');
        extraThemes.forEach(t => { if (!themes.some(base => base.id === t.id)) themes.push(t); });

        const backgrounds = [
            { id: 'none', name: 'Solid Theme', url: '' },
            { id: 'space', name: 'Galaxy', url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80' },
            { id: 'mountains', name: 'Peaks', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80' },
            { id: 'city', name: 'Neon City', url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=80' },
            { id: 'forest', name: 'Forest', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80' },
            { id: 'abstract', name: 'Abstract', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80' },
            { id: 'desert', name: 'Dunes', url: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=1200&q=80' },
            { id: 'vaporwave', name: 'Vaporwave', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' }
        ];

        function initSettingsUI() {
            const tGrid = document.getElementById('theme-grid');
            tGrid.innerHTML = '';
            themes.forEach(t => {
                const b = document.createElement('button'); b.className = `theme-btn ${t.id === currentTheme ? 'active' : ''}`;
                b.onclick = () => window.applyTheme(t.id);
                b.innerHTML = `<div class="theme-swatch" style="background: ${t.g}"></div><span style="${t.id === currentTheme ? `color: ${t.color}` : ''}">${t.name}</span>`;
                tGrid.appendChild(b);
            });
            window.applyTheme(currentTheme, false);

            const bGrid = document.getElementById('bg-grid');
            bGrid.innerHTML = '';
            backgrounds.forEach(bg => {
                const b = document.createElement('button'); b.className = `theme-btn ${bg.id === currentBgId && currentBgId !== 'custom' ? 'active' : ''}`;
                b.onclick = () => window.applyBackground(bg.id, bg.url);
                b.innerHTML = `<div class="theme-swatch" style="${bg.id==='none'?'background: var(--bg-surface);':`background: url('${bg.url}') center/cover;`}"></div><span>${bg.name}</span>`;
                bGrid.appendChild(b);
            });

            document.getElementById('customBgInput').value = customBgUrl;
            if (currentBgId === 'custom') window.applyBackground('custom', customBgUrl, false);
            else { const bo = backgrounds.find(b => b.id === currentBgId); if(bo) window.applyBackground(bo.id, bo.url, false); }

            let savedHex = localStorage.getItem('endis_custom_hex') || '#6590d9';
            document.getElementById('customThemeHex').value = savedHex;
            if(currentTheme === 'custom') window.applyCustomHex(savedHex, false);

            document.getElementById('search-engine-select').value = currentSearch;
            document.getElementById('customSearchInput').value = customSearchUrl;
            if(currentSearch === 'custom') document.getElementById('customSearchInput').style.display = 'block';

            document.getElementById('startupSelect').value = startupBehavior;
            const proxySel = document.getElementById('proxyEngineSelect');
            if (proxySel) proxySel.value = currentProxyEngine;
            document.getElementById('languageSelect').value = currentLanguage;
            document.getElementById('clockFormatSelect').value = localStorage.getItem('endis_clock_format') || '12';
            document.getElementById('panicKeyInput').value = panicKey;
            document.getElementById('panicUrlInput').value = panicUrlStr;
            document.getElementById('pinSetupInput').value = localStorage.getItem('endis_pin') || '';
            document.getElementById('pinEnableToggle').checked = localStorage.getItem('endis_pin_enabled') === 'true';
            document.getElementById('antiCloseToggle').checked = isAntiClose;
            document.getElementById('clearOnExitToggle').checked = clearOnExit;
            document.getElementById('performanceToggle').checked = isPerformanceMode;
            document.getElementById('fontSizeSelect').value = currentFontSize;
            document.getElementById('cloakSelect').value = currentCloak;

            document.getElementById('uiOpacitySlider').value = currentUiOpacity;

            window.setCloak(currentCloak, false);
            renderThemeShop();
        }

        function renderExtensionsUI() {
            const grid = document.getElementById('extensions-grid');
            if (!grid) return;
            grid.innerHTML = '';
            extensionCatalog.forEach(ext => {
                const card = document.createElement('div');
                card.className = 'extension-card';
                card.innerHTML = `<div class="extension-card-top"><div class="extension-title"><i data-lucide="${ext.icon}"></i>${ext.name}</div>
                    <label class="switch"><input type="checkbox" ${extensionState[ext.id] ? 'checked' : ''} onchange="window.toggleExtension('${ext.id}', this.checked)"><span class="slider"></span></label></div>
                    <div class="extension-desc">${ext.desc}</div>
                    <button class="btn" onclick="window.removeExtension('${ext.id}')"><i data-lucide="trash-2"></i> Remove</button>`;
                grid.appendChild(card);
            });
            applyExtensions();
            lucide.createIcons();
        }

        function renderThemeShop() {
            const library = [
                { id: 'sunset', name: 'Sunset', color: '#fb7185', bg: '#2c0c18', g: 'linear-gradient(135deg, #fb7185, #7f1d1d)', category: 'Popular' },
                { id: 'mint', name: 'Mint', color: '#34d399', bg: '#052e2b', g: 'linear-gradient(135deg, #6ee7b7, #065f46)', category: 'Popular' },
                { id: 'lavender', name: 'Lavender', color: '#c084fc', bg: '#1f1236', g: 'linear-gradient(135deg, #d8b4fe, #5b21b6)', category: 'Popular' },
                { id: 'akatsuki', name: 'Akatsuki Night', color: '#ef4444', bg: '#100608', g: 'linear-gradient(135deg, #ef4444, #1f2937)', category: 'Anime' },
                { id: 'sailor-moon', name: 'Sailor Moon', color: '#f472b6', bg: '#241133', g: 'linear-gradient(135deg, #f9a8d4, #60a5fa)', category: 'Anime' },
                { id: 'eva-unit', name: 'EVA Unit-01', color: '#84cc16', bg: '#160d1f', g: 'linear-gradient(135deg, #84cc16, #7c3aed)', category: 'Anime' },
                { id: 'one-piece', name: 'Grand Line', color: '#38bdf8', bg: '#082f49', g: 'linear-gradient(135deg, #38bdf8, #f59e0b)', category: 'Anime' },
                { id: 'demon-slayer', name: 'Demon Slayer', color: '#14b8a6', bg: '#051f1b', g: 'linear-gradient(135deg, #14b8a6, #dc2626)', category: 'Anime' },
                { id: 'opera-gx-red', name: 'Opera GX Red', color: '#ff2d55', bg: '#10060a', g: 'linear-gradient(135deg, #ff2d55, #2a0a14)', category: 'GX' },
                { id: 'opera-gx-purple', name: 'Opera GX Purple', color: '#a855f7', bg: '#120a1f', g: 'linear-gradient(135deg, #a855f7, #2563eb)', category: 'GX' },
                { id: 'opera-gx-cyan', name: 'Opera GX Cyan', color: '#06b6d4', bg: '#04171c', g: 'linear-gradient(135deg, #06b6d4, #1d4ed8)', category: 'GX' },
                { id: 'neon-grid', name: 'Neon Grid', color: '#22d3ee', bg: '#030712', g: 'linear-gradient(135deg, #22d3ee, #9333ea)', category: 'Cyber' },
                { id: 'retro-wave', name: 'Retro Wave', color: '#f472b6', bg: '#1a1233', g: 'linear-gradient(135deg, #f472b6, #22d3ee)', category: 'Cyber' }
            ];
            const categoryOrder = ['All', 'Popular', 'Anime', 'GX', 'Cyber'];
            const selectedCategory = window.currentThemeCategory || 'All';

            const toolbar = document.getElementById('theme-library-toolbar');
            const shopGrid = document.getElementById('theme-shop-grid');
            if (!shopGrid || !toolbar) return;

            toolbar.innerHTML = '';
            categoryOrder.forEach(cat => {
                const chip = document.createElement('button');
                chip.className = `theme-chip ${cat === selectedCategory ? 'active' : ''}`;
                chip.textContent = cat;
                chip.onclick = () => {
                    window.currentThemeCategory = cat;
                    renderThemeShop();
                };
                toolbar.appendChild(chip);
            });

            shopGrid.innerHTML = '';
            library.filter(t => selectedCategory === 'All' || t.category === selectedCategory).forEach(theme => {
                const installed = themes.some(t => t.id === theme.id);
                const card = document.createElement('div');
                card.className = 'shop-card';
                card.innerHTML = `<div class="theme-swatch" style="background:${theme.g}; width:100%;"></div>
                    <div class="extension-title">${theme.name}</div>
                    <div class="extension-desc">${theme.category} pack</div>
                    <button class="btn btn-primary" onclick="window.installShopTheme('${theme.id}')">${installed ? 'Apply Theme' : 'Install Theme'}</button>`;
                shopGrid.appendChild(card);
            });
            window.themeLibraryMap = Object.fromEntries(library.map(t => [t.id, t]));
            window.updateGxPreview();
            lucide.createIcons();
        }

        window.installShopTheme = function(themeId) {
            const theme = (window.themeLibraryMap || {})[themeId];
            if (!theme) return;
            if (!themes.some(t => t.id === theme.id)) {
                themes.push(theme);
                const extra = JSON.parse(localStorage.getItem('endis_extra_themes') || '[]');
                if (!extra.some(t => t.id === theme.id)) extra.push(theme);
                localStorage.setItem('endis_extra_themes', JSON.stringify(extra));
                initSettingsUI();
            }
            window.applyTheme(theme.id);
            window.showToast(`${theme.name} installed from library`, 'success');
        }

        window.updateGxPreview = function() {
            const p = document.getElementById('gxPrimaryColor');
            const s = document.getElementById('gxSecondaryColor');
            const d = document.getElementById('gxDarkness');
            const preview = document.getElementById('gxThemePreview');
            if (!p || !s || !d || !preview) return;
            const darkness = Number(d.value);
            const dark = `rgb(${darkness}, ${Math.max(4, darkness-6)}, ${Math.max(8, darkness+3)})`;
            preview.style.background = `linear-gradient(120deg, ${p.value}, ${s.value}, ${dark})`;
        }

        window.applyGxTheme = function() {
            const primary = document.getElementById('gxPrimaryColor')?.value || '#ff0055';
            const secondary = document.getElementById('gxSecondaryColor')?.value || '#00d4ff';
            const darkness = Number(document.getElementById('gxDarkness')?.value || '14');
            const darkHex = `#${Math.max(8, darkness).toString(16).padStart(2,'0')}070f`;
            const gxTheme = {
                id: 'gx-custom',
                name: 'GX Custom',
                color: primary,
                bg: darkHex,
                g: `linear-gradient(135deg, ${primary}, ${secondary})`
            };
            const idx = themes.findIndex(t => t.id === 'gx-custom');
            if (idx >= 0) themes[idx] = gxTheme;
            else themes.push(gxTheme);
            const extra = JSON.parse(localStorage.getItem('endis_extra_themes') || '[]').filter(t => t.id !== 'gx-custom');
            extra.push(gxTheme);
            localStorage.setItem('endis_extra_themes', JSON.stringify(extra));
            initSettingsUI();
            window.applyTheme('gx-custom');
            window.showToast('GX custom theme applied', 'success');
        }

        window.toggleExtension = function(id, enabled) {
            extensionState[id] = enabled;
            localStorage.setItem('endis_extensions', JSON.stringify(extensionState));
            applyExtensions();
            window.showToast(`${enabled ? 'Enabled' : 'Disabled'} extension`, 'success');
        }

        window.removeExtension = function(id) {
            extensionState[id] = false;
            localStorage.setItem('endis_extensions', JSON.stringify(extensionState));
            renderExtensionsUI();
            window.showToast('Extension removed', 'warning');
        }

        function applyExtensions() {
            document.body.classList.toggle('ext-zen-ui', !!extensionState.zenUi);
        }

        window.applyTheme = function(id, notify = true) {
            const t = themes.find(x => x.id === id); if(!t) return;
            const root = document.documentElement; const surf = shadeColor(t.bg, 15);
            root.style.setProperty('--accent-color', t.color); root.style.setProperty('--bg-main', t.bg); root.style.setProperty('--bg-surface', surf);
            root.style.setProperty('--accent-rgb', hexToRgb(t.color)); root.style.setProperty('--bg-main-rgb', hexToRgb(t.bg)); root.style.setProperty('--bg-surface-rgb', hexToRgb(surf));
            root.style.setProperty('--border-color', `rgba(${hexToRgb(t.color)}, 0.2)`);
            currentTheme = id; localStorage.setItem('endis_theme', id);
            document.querySelectorAll('#theme-grid .theme-btn').forEach((b, i) => { b.className = `theme-btn ${themes[i].id === id ? 'active' : ''}`; b.querySelector('span').style.color = themes[i].id === id ? t.color : 'var(--text-muted)'; });
            if(notify) window.showToast(`${t.name} theme applied`, 'success');
        }

        window.applyCustomHex = function(hex, notify = true) {
            const root = document.documentElement;
            root.style.setProperty('--accent-color', hex);
            root.style.setProperty('--accent-rgb', hexToRgb(hex));
            root.style.setProperty('--border-color', `rgba(${hexToRgb(hex)}, 0.2)`);
            currentTheme = 'custom';
            localStorage.setItem('endis_theme', 'custom');
            localStorage.setItem('endis_custom_hex', hex);
            document.querySelectorAll('#theme-grid .theme-btn').forEach(b => b.classList.remove('active'));
            if(notify) window.showToast(`Custom Color applied`, 'success');
        }

        window.applyBackground = function(id, url, notify = true) {
            currentBgId = id; localStorage.setItem('endis_bg_id', id);
            if (id === 'custom') localStorage.setItem('endis_custom_bg', url);
            document.body.style.backgroundImage = (id === 'none' || !url) ? 'none' : `url('${url}')`;
            document.querySelectorAll('#bg-grid .theme-btn').forEach((b, i) => { b.className = `theme-btn ${backgrounds[i] && backgrounds[i].id === id ? 'active' : ''}`; });
            if (notify) window.showToast('Background updated', 'success');
        }

        window.applyCustomBg = function() {
            const url = document.getElementById('customBgInput').value.trim();
            if(url) window.applyBackground('custom', url); else window.applyBackground('none', '');
        }

        window.handleBase64Upload = function(e) {
            const file = e.target.files[0];
            if (!file) return;
            if (file.size > 2.5 * 1024 * 1024) { window.showToast('Image too large. Please use an image under 2.5MB.', 'error'); return; }
            const reader = new FileReader();
            reader.onload = function(event) {
                const base64String = event.target.result;
                document.getElementById('customBgInput').value = base64String;
                window.applyCustomBg();
                const status = document.getElementById('uploadStatus');
                status.innerText = "Base64 Image Uploaded & Applied!";
                setTimeout(() => status.innerText = '', 4000);
            };
            reader.readAsDataURL(file);
        }

        window.updateSearchEngine = function(val) {
            currentSearch = val;
            localStorage.setItem('endis_search', val);
            document.getElementById('customSearchInput').style.display = val === 'custom' ? 'block' : 'none';
        }
        window.updateStartupBehavior = function(val) { startupBehavior = val; localStorage.setItem('endis_startup', val); }
        window.updateProxyEngine = function(val) {
            const allowed = ['ultraviolet', 'scramjet', 'rhodium'];
            currentProxyEngine = allowed.includes(val) ? val : 'ultraviolet';
            localStorage.setItem('endis_proxy_engine', currentProxyEngine);
            window.showToast(`Proxy engine set to ${currentProxyEngine}`, 'success');
            const active = tabs.find(t => t.id === activeTabId);
            if (active && active.url && !active.isRaw && active.url !== '/select' && !active.url.startsWith('about:')) {
                WaveEngine.navigate(active.id, active.url, false);
            }
        }
        window.updateClockFormat = function(val) { localStorage.setItem('endis_clock_format', val); updateClock(); window.showToast('Clock Format Updated', 'success'); }

        window.togglePerformanceMode = function() {
            isPerformanceMode = document.getElementById('performanceToggle').checked;
            localStorage.setItem('endis_perf_mode', isPerformanceMode);
            if(isPerformanceMode) { document.body.classList.add('performance-mode'); window.showToast('Performance Mode enabled', 'success'); }
            else { document.body.classList.remove('performance-mode'); window.showToast('Performance Mode disabled', 'info'); }
        }

        window.updateFontSize = function(val, notify = true) {
            currentFontSize = val; localStorage.setItem('endis_font_size', val);
            document.documentElement.style.setProperty('--ui-font-size', val);
            if(notify) window.showToast('UI Scale Updated', 'success');
        }

        window.updateUiOpacity = function(val) { document.body.style.opacity = val; }
        window.saveUiOpacity = function(val) { currentUiOpacity = val; localStorage.setItem('endis_ui_opacity', val); window.showToast('Opacity Saved', 'success'); }

        // --- STEALTH & PRIVACY ---
        window.saveStealthSettings = function() {
            const nk = document.getElementById('panicKeyInput').value; if (nk) { panicKey = nk; localStorage.setItem('seaHotkey', panicKey); }
            panicUrlStr = document.getElementById('panicUrlInput').value || 'https://google.com'; localStorage.setItem('seaPanicUrl', panicUrlStr);
            isAntiClose = document.getElementById('antiCloseToggle').checked; localStorage.setItem('seaAntiClose', isAntiClose);

            let pinCode = document.getElementById('pinSetupInput').value;
            let pinEnabled = document.getElementById('pinEnableToggle').checked;
            localStorage.setItem('endis_pin', pinCode);
            localStorage.setItem('endis_pin_enabled', pinEnabled);

            window.showToast('Stealth configuration saved', 'success');
        }
        window.updatePrivacySettings = function() {
            clearOnExit = document.getElementById('clearOnExitToggle').checked;
            localStorage.setItem('seaClearOnExit', clearOnExit);
        }

        // KEYBOARD SHORTCUTS
        document.addEventListener('keydown', (e) => {
            if(isLocked) return;

            if ((e.ctrlKey || e.metaKey)) {
                if (e.key.toLowerCase() === 't' && !e.shiftKey) { e.preventDefault(); window.addTab(); }
                if (e.key.toLowerCase() === 'w') { e.preventDefault(); window.closeTab(activeTabId, e); }
                if (e.key.toLowerCase() === 'l') {
                    e.preventDefault();
                    const topUrl = document.getElementById('top-url');
                    if (topUrl && document.getElementById('hub-view').style.display === 'none') { topUrl.focus(); topUrl.select(); }
                    else { document.getElementById('center-url').focus(); }
                }
                if (e.shiftKey && e.key.toLowerCase() === 't') { e.preventDefault(); window.restoreClosedTab(); }
            }

            if (e.altKey) {
                if (e.key.toLowerCase() === 'd') { e.preventDefault(); contextTargetTabId = activeTabId; window.duplicateContextTab(); }
                if (e.key.toLowerCase() === 'm') { e.preventDefault(); contextTargetTabId = activeTabId; window.toggleMuteContextTab(); }
            }

            if (e.key === "Escape") {
                document.querySelectorAll('.overlay').forEach(o => {if(o.id!=='lock-screen-overlay') o.style.display='none';});
                document.querySelectorAll('.suggestions-dropdown').forEach(d => d.style.display='none');
            }
            if (e.key === 'F4') { e.preventDefault(); window.toggleFocusMode(); }
            if (e.key.toLowerCase() === panicKey.toLowerCase() && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') window.location.href = panicUrlStr;
        });

        window.onbeforeunload = function() {
            if(clearOnExit) { browserHistory = []; localStorage.removeItem('endis_history'); }
            if(isAntiClose) return "Preventing tab closure.";
        };
        window.setCloak = function(type, save = true) {
            let t = "sdvsdvfsvd", i = "";
            if (type === 'google') { t = "Google"; i = "https://www.google.com/favicon.ico"; }
            else if (type === 'drive') { t = "My Drive - Google Drive"; i = "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png"; }
            else if (type === 'ixl') { t = "IXL | Learning"; i = "https://www.ixl.com/favicon.ico"; }
            else if (type === 'canvas') { t = "Dashboard"; i = "https://canvas.instructure.com/favicon.ico"; }
            document.getElementById('page-title').innerText = t; document.getElementById('favicon').href = i;
            if (save) { currentCloak = type; localStorage.setItem('seaCloak', type); window.showToast('Tab cloaking updated', 'success'); }
        };

        // --- HUB APPS ---
        function renderHubApps() {
            const grid = document.getElementById('hub-apps'); grid.innerHTML = '';
            customApps.forEach((app, i) => {
                const el = document.createElement('div'); el.className = 'app-item';
                el.innerHTML = `<div class="remove-app" onclick="event.stopPropagation(); window.removeApp(${i})"><i data-lucide="x" style="width:14px;"></i></div>
                                <img src="${app.icon}" alt="Icon" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYTY5NGEwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48bGluZSB4MT0iMiIgeTE9IjEyIiB4Mj0iMjIiIHkyPSIxMiIvPjxwYXRoIGQ9Ik0xMiAyYTE1LjMgMTUuMyAwIDAgMSA0IDEwIDE1LjMgMTUuMyAwIDAgMS00IDEwIDE1LjMgMTUuMyAwIDAgMS00LTEwIDE1LjMgMTUuMyAwIDAgMSA0LTEweiIvPjwvc3ZnPg=='">
                                <span>${app.name}</span>`;
                el.onclick = () => window.loadUrl(app.url); grid.appendChild(el);
            });
            const addBtn = document.createElement('div'); addBtn.className = 'app-item add-app-btn';
            addBtn.innerHTML = `<i data-lucide="plus"></i><span style="color:var(--text-muted)" data-i18n="add_shortcut">${translations[currentLanguage] ? translations[currentLanguage]['add_shortcut'] : 'Add Shortcut'}</span>`;
            addBtn.onclick = () => {
                const url = prompt("Enter website URL (e.g. https://reddit.com):");
                if(url) {
                    let finalUrl = url.startsWith('http') ? url : 'https://' + url;
                    let name = prompt("Enter shortcut name:") || new URL(finalUrl).hostname.replace('www.','');
                    customApps.push({name, url: finalUrl, icon: getFavicon(finalUrl)});
                    localStorage.setItem('endis_apps', JSON.stringify(customApps)); renderHubApps();
                }
            };
            grid.appendChild(addBtn); lucide.createIcons();
        }
        window.removeApp = function(index) { customApps.splice(index, 1); localStorage.setItem('endis_apps', JSON.stringify(customApps)); renderHubApps(); }

        // --- HISTORY, BOOKMARKS & DATA MGMT ---
        function addToHistory(url, title, isIncognito) {
            if (isIncognito || !url || url === '/select' || url.startsWith('about:')) return;
            if (browserHistory.length > 0 && browserHistory[0].url === url) return;
            browserHistory.unshift({ url, title: title || new URL(url).hostname, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) });
            if(browserHistory.length > 100) browserHistory.pop();
            localStorage.setItem('endis_history', JSON.stringify(browserHistory)); renderHistory();
        }
        function renderHistory(filter = '') {
            const l = document.getElementById('history-list'); l.innerHTML = '';
            let filtered = browserHistory;
            if (filter.trim() !== '') {
                const q = filter.toLowerCase();
                filtered = browserHistory.filter(i => i.title.toLowerCase().includes(q) || i.url.toLowerCase().includes(q));
            }
            if (filtered.length === 0) { l.innerHTML = '<div style="text-align:center; color: var(--text-muted); padding: 20px;">No results found.</div>'; return; }
            filtered.forEach((i) => {
                const e = document.createElement('div'); e.className = 'list-item'; e.onclick = () => { window.loadUrl(i.url); window.closeModal('library-modal'); };
                e.innerHTML = `<div class="list-item-icon"><img src="${getFavicon(i.url)}" onerror="this.style.display='none'"></div>
                    <div class="list-item-details"><div class="list-title">${i.title}</div><div class="list-url">${i.url}</div></div><div class="list-meta">${i.time}</div>`;
                l.appendChild(e);
            });
        }
        window.filterHistory = function(query) { renderHistory(query); }
        window.clearHistory = function() { browserHistory = []; localStorage.removeItem('endis_history'); renderHistory(); window.showToast('History cleared', 'success'); }

        window.toggleBookmark = function() {
            const tab = tabs.find(t => t.id === activeTabId); if(!tab || !tab.url || tab.url==='') return;
            const idx = bookmarks.findIndex(b => b.url === tab.url);
            if (idx > -1) { bookmarks.splice(idx, 1); window.showToast('Bookmark removed', 'info'); }
            else { bookmarks.push({ url: tab.url, title: tab.title || new URL(tab.url).hostname, icon: getFavicon(tab.url) }); window.showToast('Bookmarked!', 'success'); }
            localStorage.setItem('endis_bookmarks', JSON.stringify(bookmarks)); renderBookmarks(); updateUI();
        }
        function renderBookmarks(filter = '') {
            const l = document.getElementById('bookmarks-list'); l.innerHTML = '';
            let filtered = bookmarks;
            if (filter.trim() !== '') {
                const q = filter.toLowerCase();
                filtered = bookmarks.filter(i => i.title.toLowerCase().includes(q) || i.url.toLowerCase().includes(q));
            }
            if (filtered.length === 0) { l.innerHTML = '<div style="text-align:center; color: var(--text-muted); padding: 20px;">No results found.</div>'; return; }
            filtered.forEach((b, i) => {
                const e = document.createElement('div'); e.className = 'list-item';
                e.innerHTML = `<div class="list-item-icon"><img src="${b.icon}" onerror="this.style.display='none'"></div>
                    <div class="list-item-details" onclick="window.loadUrl('${b.url}'); window.closeModal('library-modal');"><div class="list-title">${b.title}</div><div class="list-url">${b.url}</div></div>
                    <div class="list-action" onclick="event.stopPropagation(); bookmarks.splice(${i},1); localStorage.setItem('endis_bookmarks', JSON.stringify(bookmarks)); renderBookmarks(); updateUI();"><i data-lucide="trash-2" style="width:16px;"></i></div>`;
                l.appendChild(e);
            }); lucide.createIcons();
        }
        window.filterBookmarks = function(query) { renderBookmarks(query); }

        window.exportBrowserData = function() {
            const data = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if(key.startsWith('endis_') || key.startsWith('sea')) { data[key] = localStorage.getItem(key); }
            }
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a'); a.href = url; a.download = 'endis_browser_backup.json';
            document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
            window.showToast('Data exported successfully', 'success');
        }

        window.importBrowserData = function(event) {
            const file = event.target.files[0]; if(!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    for (const key in data) { localStorage.setItem(key, data[key]); }
                    window.showToast('Data imported. Reloading...', 'success');
                    setTimeout(() => location.reload(), 1500);
                } catch(err) { window.showToast('Invalid backup file', 'error'); }
            };
            reader.readAsText(file);
        }

        window.factoryReset = function() {
            if(confirm("Are you sure? This will wipe all history, bookmarks, base64 images, apps, and settings.")) { localStorage.clear(); location.reload(); }
        }

        function saveSession() {
            const sessionTabs = tabs.filter(t => !t.incognito);
            localStorage.setItem('endis_session', JSON.stringify(sessionTabs));
        }

        // --- WAVE IFRAME ENGINE (MOCK) ---
        const canvasContainer = document.getElementById('canvas-container');
        const WaveEngine = {
            createSurface: () => { const id = 'tab-' + Date.now() + Math.floor(Math.random()*1000); const f = document.createElement('iframe'); f.id = 'frame-' + id; f.className = 'fallback-frame'; canvasContainer.appendChild(f); return id; },
            switchSurface: (id) => { document.querySelectorAll('.fallback-frame').forEach(f => f.style.display = 'none'); const f = document.getElementById('frame-' + id); if(f) f.style.display = 'block'; },
            closeSurface: (id) => { const f = document.getElementById('frame-' + id); if(f) f.remove(); },
            navigate: (id, url, isRaw) => {
                const f = document.getElementById('frame-' + id);
                if (f && url) {
                    const proxyBase = proxyRouteMap[currentProxyEngine] || '/chat';
                    const chatUrl = window.location.origin + proxyBase + '#' + String(url);
                    f.src = (isRaw || url === '/select') ? url : chatUrl;
                }
            },
            reload: (id) => { const f = document.getElementById('frame-' + id); if(f) f.src = f.src; }
        };

        // --- BROWSER CONTROLS ---
        window.openGameTab = function() { window.addTab(); window.loadUrl('/select', true); }

        window.addTab = function(incognito = false) {
            const newId = WaveEngine.createSurface();
            tabs.push({ id: newId, url: '', title: 'New Tab', isRaw: false, incognito, pinned: false, muted: false, sleeping: false });
            window.switchTab(newId);
            if(incognito) window.showToast('Incognito tab opened.', 'info');
        }

        window.switchTab = function(id) {
            const t = tabs.find(tab => tab.id === id);
            if (t && t.sleeping) {
                t.sleeping = false;
                WaveEngine.navigate(t.id, t.url, t.isRaw); // Wake up
            }
            activeTabId = id;
            if (splitView.enabled && id !== splitView.leftId && id !== splitView.rightId) setSplitViewState(false);
            updateUI();
        }

        window.closeTab = function(id, event) {
            if(event) event.stopPropagation();
            const idx = tabs.findIndex(t => t.id === id);
            if(idx > -1 && !tabs[idx].incognito) closedTabsHistory.push({...tabs[idx]});

            tabs.splice(idx, 1); WaveEngine.closeSurface(id);
            if (splitView.enabled && (splitView.leftId === id || splitView.rightId === id)) setSplitViewState(false);

            if (tabs.length === 0) { window.addTab(); return; }
            if (activeTabId === id) window.switchTab(tabs[idx > 0 ? idx - 1 : 0].id); else updateUI();
        }

        window.restoreClosedTab = function() {
            if(closedTabsHistory.length === 0) return;
            const t = closedTabsHistory.pop();
            const newId = WaveEngine.createSurface();
            tabs.push({ id: newId, url: t.url, title: t.title, isRaw: t.isRaw, incognito: false, pinned: false, muted: false, sleeping: false });
            if(t.url) WaveEngine.navigate(newId, t.url, t.isRaw);
            window.switchTab(newId);
        }

        window.loadUrl = function(url, isRaw = false) {
            const tab = tabs.find(t => t.id === activeTabId);
            if(tab) { tab.url = url; tab.isRaw = isRaw || url === '/select'; tab.sleeping = false; }

            const bar = document.getElementById('loading-bar'); bar.style.opacity = '1'; bar.style.width = '30%';

            if (url) {
                let tempTitle = url;
                if(url !== '/select' && !url.startsWith('about:')) { try { tempTitle = new URL(url).hostname.replace('www.', ''); } catch(e){} addToHistory(url, tempTitle, tab ? tab.incognito : false); }
                if(tab) tab.title = tempTitle;

                WaveEngine.navigate(activeTabId, url, tab ? tab.isRaw : false);
                setTimeout(() => { bar.style.width = '100%'; setTimeout(() => { bar.style.opacity = '0'; setTimeout(() => bar.style.width = '0%', 200); }, 300); }, 800);
            }
            updateUI();
        }

        window.goHome = function() { window.loadUrl(''); setRandomMessage(); }

        function canUseSplitPair(leftId, rightId) {
            const left = tabs.find(t => t.id === leftId);
            const right = tabs.find(t => t.id === rightId);
            if (!left || !right || left.id === right.id) return false;
            if (!left.url || !right.url) return false;
            if (left.url.includes('about:blank') || right.url.includes('about:blank')) return false;
            return true;
        }

        window.enableSplitView = function(leftId, rightId) {
            if (!canUseSplitPair(leftId, rightId)) {
                window.showToast('Open two real pages before splitting tabs.', 'warning');
                return;
            }
            setSplitViewState(true, leftId, rightId);
            activeTabId = leftId;
            updateUI();
            window.showToast('Split view enabled', 'success');
        }


        window.quickSplitFromActive = function() {
            if (tabs.length < 2 || !activeTabId) { window.showToast('Open at least 2 tabs first.', 'warning'); return; }
            const active = tabs.find(t => t.id === activeTabId);
            const partner = tabs.find(t => t.id !== activeTabId && t.url && !t.url.includes('about:blank'));
            if (!active || !active.url || active.url.includes('about:blank') || !partner) {
                window.showToast('Load two real pages, then quick split.', 'warning');
                return;
            }
            window.enableSplitView(active.id, partner.id);
        }

        window.disableSplitView = function() {
            setSplitViewState(false);
            updateUI();
            window.showToast('Split view closed', 'info');
        }

        window.swapSplitTabs = function() {
            if (!splitView.enabled) return;
            const oldLeft = splitView.leftId;
            splitView.leftId = splitView.rightId;
            splitView.rightId = oldLeft;
            activeTabId = splitView.leftId;
            updateUI();
        }

        window.goBack = function() { window.showToast("Navigation disabled in proxy mode", "warning"); }
        window.goForward = function() { window.showToast("Navigation disabled in proxy mode", "warning"); }
        window.refreshFrame = function() { WaveEngine.reload(activeTabId); document.getElementById('loading-bar').style.opacity = '1'; document.getElementById('loading-bar').style.width = '30%'; }

        function updateUI() {
            const tab = tabs.find(t => t.id === activeTabId); if(!tab) return;
            const topInput = document.getElementById('top-url');
            topInput.value = tab.url;
            document.getElementById('center-url').value = "";
            document.getElementById('topSuggestions').style.display = 'none';
            document.getElementById('centerSuggestions').style.display = 'none';

            const clrBtn = document.getElementById('clear-url-btn');
            if (tab.url.length > 0) clrBtn.style.display = 'block'; else clrBtn.style.display = 'none';

            const header = document.getElementById('main-header');
            if(tab.incognito) header.classList.add('incognito-mode'); else header.classList.remove('incognito-mode');

            const star = document.getElementById('bookmark-star');
            if (star && tab.url && bookmarks.some(b => b.url === tab.url)) {
                star.style.fill = '#fbbf24'; star.style.color = '#fbbf24'; star.style.stroke = '#fbbf24';
            } else if (star) {
                star.style.fill = 'none'; star.style.color = 'currentColor'; star.style.stroke = 'currentColor';
            }

            const cc = document.getElementById('canvas-container');
            const splitBanner = document.getElementById('split-banner');
            const splitMeta = document.getElementById('split-meta');
            if (tab.url === '' || tab.url.includes('about:blank')) {
                document.getElementById('hub-view').style.display = 'flex'; cc.style.display = 'none';
                splitBanner.style.display = 'none';
                if(tab.url === '') document.getElementById('top-url').focus();
            } else {
                document.getElementById('hub-view').style.display = 'none';
                cc.style.display = 'block';
                const leftTab = tabs.find(t => t.id === splitView.leftId);
                const rightTab = tabs.find(t => t.id === splitView.rightId);
                const splitReady = splitView.enabled && leftTab && rightTab && leftTab.url && rightTab.url && !leftTab.url.includes('about:blank') && !rightTab.url.includes('about:blank');
                if (splitReady) {
                    splitBanner.style.display = 'flex';
                    splitMeta.textContent = `${leftTab.title || leftTab.url}  |  ${rightTab.title || rightTab.url}`;
                } else {
                    splitBanner.style.display = 'none';
                    setSplitViewState(false);
                }
                document.querySelectorAll('.fallback-frame').forEach(f => {
                    f.style.position = 'absolute'; f.style.top = '0'; f.style.bottom = '0'; f.style.height = '100%';
                    if (splitView.enabled && splitReady) {
                        if (f.id === 'frame-' + splitView.leftId) {
                            f.style.display = 'block'; f.style.left = '0'; f.style.width = '50%'; f.style.borderRight = '1px solid var(--border-color)';
                        } else if (f.id === 'frame-' + splitView.rightId) {
                            f.style.display = 'block'; f.style.left = '50%'; f.style.width = '50%'; f.style.borderRight = 'none';
                        } else {
                            f.style.display = 'none';
                        }
                    } else {
                        f.style.width = '100%'; f.style.left = '0'; f.style.borderRight = 'none';
                        if(f.id === 'frame-' + activeTabId) f.style.display = 'block';
                        else f.style.display = 'none';
                    }
                });
            }
            renderTabs();
            saveSession();
        }

        // --- DRAG AND DROP TABS ---
        let dragSrcId = null;
        window.handleDragStart = function(e, id) { dragSrcId = id; e.target.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; }
        window.handleDragOver = function(e, id) {
            e.preventDefault(); e.dataTransfer.dropEffect = 'move';
            if(dragSrcId === id) return;
            document.querySelectorAll('.tab').forEach(t => { t.classList.remove('drag-over-left'); t.classList.remove('drag-over-right'); });
            const targetEl = e.target.closest('.tab'); if(!targetEl) return;
            const rect = targetEl.getBoundingClientRect();
            if (e.clientX < rect.left + rect.width / 2) targetEl.classList.add('drag-over-left'); else targetEl.classList.add('drag-over-right');
        }
        window.handleDrop = function(e, dropId) {
            e.preventDefault(); document.querySelectorAll('.tab').forEach(t => { t.classList.remove('drag-over-left'); t.classList.remove('drag-over-right'); t.classList.remove('dragging'); });
            if (dragSrcId === dropId || !dragSrcId) return;

            const dragTab = tabs.find(t => t.id === dragSrcId);
            const targetTab = tabs.find(t => t.id === dropId);
            if(dragTab && targetTab && dragTab.pinned !== targetTab.pinned) return;

            const targetEl = e.target.closest('.tab');
            if (targetEl) {
                const rect = targetEl.getBoundingClientRect();
                const ratio = (e.clientX - rect.left) / rect.width;
                if (ratio > 0.35 && ratio < 0.65) {
                    window.enableSplitView(dropId, dragSrcId);
                    return;
                }
            }

            const srcIndex = tabs.findIndex(t => t.id === dragSrcId); const dropIndex = tabs.findIndex(t => t.id === dropId);
            let insertIndex = dropIndex;
            if (targetEl && targetEl.classList.contains('drag-over-right')) insertIndex++;
            const [draggedTab] = tabs.splice(srcIndex, 1);
            if (srcIndex < insertIndex) insertIndex--; // Adjust after removal
            tabs.splice(insertIndex, 0, draggedTab);
            renderTabs(); saveSession();
        }

        // --- CUSTOM CONTEXT MENU & TOOLTIPS ---
        window.showContextMenu = function(e, id) {
            e.preventDefault(); contextTargetTabId = id; window.hideTabTooltip();
            const menu = document.getElementById('tab-context-menu');
            const t = tabs.find(tab => tab.id === id);

            let pinStr = translations[currentLanguage] ? (translations[currentLanguage]['pin_tab'] || "Pin Tab") : "Pin Tab";
            let unpinStr = translations[currentLanguage] ? (translations[currentLanguage]['unpin_tab'] || "Unpin Tab") : "Unpin Tab";
            let muteStr = translations[currentLanguage] ? (translations[currentLanguage]['mute_tab'] || "Mute Tab") : "Mute Tab";
            let unmuteStr = translations[currentLanguage] ? (translations[currentLanguage]['unmute_tab'] || "Unmute Tab") : "Unmute Tab";
            let sleepStr = translations[currentLanguage] ? (translations[currentLanguage]['sleep_tab'] || "Sleep Tab (Save RAM)") : "Sleep Tab (Save RAM)";
            let wakeStr = translations[currentLanguage] ? (translations[currentLanguage]['wake_tab'] || "Wake Tab") : "Wake Tab";

            if(t) {
                document.getElementById('ctx-pin-text').innerText = t.pinned ? unpinStr : pinStr;
                document.getElementById('ctx-pin').querySelector('i').setAttribute('data-lucide', t.pinned ? 'pin-off' : 'pin');
                document.getElementById('ctx-mute-text').innerText = t.muted ? unmuteStr : muteStr;
                document.getElementById('ctx-mute').querySelector('i').setAttribute('data-lucide', t.muted ? 'volume-2' : 'volume-x');
                document.getElementById('ctx-sleep-text').innerText = t.sleeping ? wakeStr : sleepStr;
                document.getElementById('ctx-sleep').querySelector('i').setAttribute('data-lucide', t.sleeping ? 'sun' : 'moon');
                lucide.createIcons();
            }

            menu.style.display = 'flex';
            menu.style.left = e.pageX + 'px'; menu.style.top = e.pageY + 'px';
        }

        window.copyContextTabUrl = function() {
            if(!contextTargetTabId) return;
            const t = tabs.find(tab => tab.id === contextTargetTabId);
            if(t && t.url) {
                navigator.clipboard.writeText(t.url);
                window.showToast("URL Copied to Clipboard", "success");
            }
            document.getElementById('tab-context-menu').style.display = 'none';
        }

        window.duplicateContextTab = function() {
            if(!contextTargetTabId) return;
            const t = tabs.find(tab => tab.id === contextTargetTabId);
            if(t) {
                const newId = WaveEngine.createSurface();
                tabs.push({ id: newId, url: t.url, title: t.title, isRaw: t.isRaw, incognito: t.incognito, pinned: false, muted: false, sleeping: false });
                if(t.url) WaveEngine.navigate(newId, t.url, t.isRaw);
                window.switchTab(newId);
            }
            document.getElementById('tab-context-menu').style.display = 'none';
        }
        window.closeOtherContextTabs = function() {
            if(!contextTargetTabId) return;
            const toClose = tabs.filter(t => t.id !== contextTargetTabId);
            toClose.forEach(t => { WaveEngine.closeSurface(t.id); });
            tabs = tabs.filter(t => t.id === contextTargetTabId);
            window.switchTab(contextTargetTabId);
            document.getElementById('tab-context-menu').style.display = 'none';
        }
        window.closeAllContextTabs = function() {
            tabs.forEach(t => { WaveEngine.closeSurface(t.id); });
            tabs = [];
            window.addTab();
            document.getElementById('tab-context-menu').style.display = 'none';
        }
        window.togglePinContextTab = function() {
            if(!contextTargetTabId) return;
            const t = tabs.find(tab => tab.id === contextTargetTabId);
            if(t) {
                t.pinned = !t.pinned;
                tabs = tabs.filter(tab => tab.id !== contextTargetTabId);
                if(t.pinned) tabs.unshift(t); else tabs.push(t);
                renderTabs(); saveSession();
            }
            document.getElementById('tab-context-menu').style.display = 'none';
        }
        window.toggleMuteContextTab = function() {
            if(!contextTargetTabId) return;
            const t = tabs.find(tab => tab.id === contextTargetTabId);
            if(t) { t.muted = !t.muted; renderTabs(); saveSession(); }
            document.getElementById('tab-context-menu').style.display = 'none';
        }
        window.toggleSleepContextTab = function() {
            if(!contextTargetTabId) return;
            const t = tabs.find(tab => tab.id === contextTargetTabId);
            if(t) {
                t.sleeping = !t.sleeping;
                if(t.sleeping) WaveEngine.navigate(t.id, 'about:blank', true); // Unload iframe
                else WaveEngine.navigate(t.id, t.url, t.isRaw); // Reload iframe
                renderTabs(); saveSession();
            }
            document.getElementById('tab-context-menu').style.display = 'none';
        }

        let tooltipTimeout;
        window.showTabTooltip = function(e, tab) {
            clearTimeout(tooltipTimeout);
            tooltipTimeout = setTimeout(() => {
                const tt = document.getElementById('tab-hover-tooltip');
                document.getElementById('tt-title-text').innerText = tab.title || "New Tab";
                document.getElementById('tt-url-text').innerText = tab.sleeping ? "💤 Sleeping to save memory" : (tab.url || "about:blank");
                tt.style.display = 'flex';
                const rect = e.target.getBoundingClientRect();
                tt.style.left = Math.min(rect.left, window.innerWidth - 300) + 'px';
                tt.style.top = (rect.bottom + 5) + 'px';
                setTimeout(() => tt.style.opacity = '1', 10);
            }, 600);
        }
        window.hideTabTooltip = function() {
            clearTimeout(tooltipTimeout);
            const tt = document.getElementById('tab-hover-tooltip');
            tt.style.opacity = '0';
            setTimeout(() => tt.style.display = 'none', 200);
        }

        function renderTabs() {
            const list = document.getElementById('tab-list'); list.innerHTML = '';
            let newTabStr = translations[currentLanguage] ? (translations[currentLanguage]['new_tab'] || "New Tab") : "New Tab";
            let gamesStr = translations[currentLanguage] ? (translations[currentLanguage]['games'] || "Games") : "Games";

            tabs.forEach(tab => {
                const isAct = tab.id === activeTabId; const isH = tab.url === '' || tab.url.includes('about:blank'); const isG = tab.url === '/select';
                const div = document.createElement('div');
                div.className = `tab ${isAct ? 'active' : ''} ${tab.incognito ? 'private' : ''} ${tab.pinned ? 'pinned' : ''} ${tab.sleeping ? 'sleeping' : ''} ${(splitView.enabled && (tab.id === splitView.leftId || tab.id === splitView.rightId)) ? 'split-member' : ''}`;
                div.onclick = () => window.switchTab(tab.id);
                div.draggable = true;
                div.addEventListener('dragstart', (e) => window.handleDragStart(e, tab.id));
                div.addEventListener('dragover', (e) => window.handleDragOver(e, tab.id));
                div.addEventListener('drop', (e) => window.handleDrop(e, tab.id));
                div.addEventListener('dragend', () => document.querySelectorAll('.tab').forEach(t=>t.classList.remove('dragging')));
                div.addEventListener('contextmenu', (e) => window.showContextMenu(e, tab.id));
                div.addEventListener('mouseenter', (e) => window.showTabTooltip(e, tab));
                div.addEventListener('mouseleave', () => window.hideTabTooltip());

                let title = isH ? newTabStr : (isG ? gamesStr : (tab.title || tab.url));
                const icon = isH ? 'layout-grid' : (tab.incognito ? 'ghost' : (isG ? 'gamepad-2' : 'globe'));
                div.innerHTML = `<i data-lucide="${icon}" style="width:14px; color: ${isAct ? (tab.incognito?'#9ca3af':'var(--accent-color)') : 'var(--text-muted)'};"></i>
                                 <span class="tab-title">${title}</span>
                                 ${tab.muted ? `<i data-lucide="volume-x" style="width:12px; margin-left:4px; color:var(--danger);"></i>` : ''}
                                 <i data-lucide="x" class="tab-close" onclick="window.closeTab('${tab.id}', event)"></i>`;
                list.appendChild(div);
            });
            lucide.createIcons();
        }

        // --- SMART AUTOCOMPLETE & MATH & BANGS ---
        let currentSuggestions = [];
        let suggestTimeout;
        let selectedSuggestIndex = -1;

        window.handleInput = function(event) {
            const inputId = event.target.id;
            const boxId = inputId === 'top-url' ? 'topSuggestions' : 'centerSuggestions';
            const query = event.target.value;

            const clrBtn = document.getElementById('clear-url-btn');
            if (inputId === 'top-url') {
                if (query.length > 0) clrBtn.style.display = 'block';
                else clrBtn.style.display = 'none';
            }

            clearTimeout(suggestTimeout);
            suggestTimeout = setTimeout(() => fetchSuggestions(query, inputId, boxId), 200);
        }

        function renderSuggestionsUI(query, boxId, inputId) {
            const suggestionsBox = document.getElementById(boxId);
            if (!suggestionsBox) return;

            selectedSuggestIndex = -1;
            suggestionsBox.innerHTML = '';

            if (currentSuggestions.length === 0) {
                suggestionsBox.style.display = 'none';
                return;
            }

            currentSuggestions.forEach((m, i) => {
                const el = document.createElement('div'); el.className = 'suggestion-item';
                el.dataset.url = m.url || ''; el.dataset.text = m.text;
                el.onmousedown = (e) => {
                    e.preventDefault();
                    if(m.url) window.loadUrl(m.url);
                    else window.loadUrl(searchUrlFormatted(m.text));
                    document.getElementById(inputId).blur();
                    suggestionsBox.style.display='none';
                };
                el.innerHTML = `<i data-lucide="${m.icon || 'search'}"></i><div class="suggestion-text">${m.label || m.text}</div><div class="suggestion-type">${m.type}</div>`;
                suggestionsBox.appendChild(el);
            });
            suggestionsBox.style.display = 'flex'; lucide.createIcons();
        }

        function fetchSuggestions(query, inputId, boxId) {
            if (!query.trim() || !extensionState.smartSuggest) {
                const box = document.getElementById(boxId);
                if (box) box.style.display = 'none';
                return;
            }

            const callbackName = 'jsonp_' + Math.round(100000 * Math.random());

            window[callbackName] = function(data) {
                currentSuggestions = [];

                // MATH CALCULATOR: if query is a safe math expression
                if (extensionState.quickCalc && /^[0-9\+\-\*\/\(\)\.\s]+$/.test(query) && /[0-9]/.test(query) && /[\+\-\*\/]/.test(query)) {
                    try {
                        const result = eval(query);
                        if (result !== undefined && !isNaN(result)) {
                            currentSuggestions.push({text: result.toString(), type: 'Calculator', icon: 'calculator', label: query + ' = ' + result});
                        }
                    } catch(e){}
                }

                let local = [];
                [...bookmarks, ...browserHistory].forEach(item => {
                    if (item.title.toLowerCase().includes(query.toLowerCase()) || item.url.toLowerCase().includes(query.toLowerCase())) {
                        if(!local.some(m => m.url === item.url)) local.push({ text: item.title, url: item.url, type: 'Local', icon: 'book-mark', label: item.title });
                    }
                });
                currentSuggestions = currentSuggestions.concat(local.slice(0, 3));

                if (data && data[1]) {
                    data[1].slice(0, 4).forEach(i => {
                        currentSuggestions.push({text: i, type: 'Search', icon: 'search', label: i});
                    });
                }

                renderSuggestionsUI(query, boxId, inputId);
                delete window[callbackName];
                const scriptEl = document.getElementById(callbackName);
                if (scriptEl && scriptEl.parentNode) scriptEl.parentNode.removeChild(scriptEl);
            };

            var script = document.createElement('script');
            script.id = callbackName;
            script.src = 'https://suggestqueries.google.com/complete/search?client=chrome&q=' + encodeURIComponent(query) + '&callback=' + callbackName;

            script.onerror = function() {
                currentSuggestions = [{ text: query, type: 'search-direct', label: query + ' — Search', icon: 'search' }];

                // MATH CALCULATOR FALLBACK
                if (extensionState.quickCalc && /^[0-9\+\-\*\/\(\)\.\s]+$/.test(query) && /[0-9]/.test(query) && /[\+\-\*\/]/.test(query)) {
                    try {
                        const result = eval(query);
                        if (result !== undefined && !isNaN(result)) {
                            currentSuggestions.unshift({text: result.toString(), type: 'Calculator', icon: 'calculator', label: query + ' = ' + result});
                        }
                    } catch(e){}
                }

                var isUrl = /^(https?:\/\/|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/.test(query);
                if (isUrl) {
                    currentSuggestions.unshift({ text: query, type: 'url', label: query, url: query.startsWith('http') ? query : 'https://' + query, icon: 'globe' });
                }
                renderSuggestionsUI(query, boxId, inputId);
                delete window[callbackName];
                if (script.parentNode) script.parentNode.removeChild(script);
            };
            document.head.appendChild(script);
        }

        function searchUrlFormatted(query) {
            if (currentSearch === 'custom' && customSearchUrl) { return customSearchUrl + encodeURIComponent(query); }
            const eng = { 'duckduckgo': 'https://duckduckgo.com/?q=', 'google': 'https://www.google.com/search?q=', 'bing': 'https://www.bing.com/search?q=', 'brave': 'https://search.brave.com/search?q=', 'yahoo': 'https://search.yahoo.com/search?p=' };
            return eng[currentSearch] + encodeURIComponent(query);
        }

        window.toggleMusicDrawer = function() {
            isMusicDrawerOpen = !isMusicDrawerOpen;
            const drawer = document.getElementById('music-drawer');
            drawer.classList.toggle('open', isMusicDrawerOpen);
            localStorage.setItem('endis_music_drawer', isMusicDrawerOpen);
            window.showToast(isMusicDrawerOpen ? 'Music drawer opened' : 'Music drawer closed', 'info');
        }

        window.handleSearch = function(event) {
            const inputId = event.target.id;
            const boxId = inputId === 'top-url' ? 'topSuggestions' : 'centerSuggestions';
            const box = document.getElementById(boxId);
            const items = box ? box.querySelectorAll('.suggestion-item') : [];
            const query = event.target.value;

            if (event.key === 'ArrowDown') {
                event.preventDefault(); if (selectedSuggestIndex < items.length - 1) selectedSuggestIndex++;
                items.forEach((it, i) => it.classList.toggle('active', i === selectedSuggestIndex));
                return;
            }
            if (event.key === 'ArrowUp') {
                event.preventDefault(); if (selectedSuggestIndex > -1) selectedSuggestIndex--;
                items.forEach((it, i) => it.classList.toggle('active', i === selectedSuggestIndex));
                return;
            }
            if (event.key === 'Escape') {
                if (box) box.style.display = 'none';
                return;
            }
            if (event.key === 'Enter' && query.trim() !== '') {
                if (box) box.style.display = 'none';
                let finalUrl = query.trim();

                if (selectedSuggestIndex >= 0 && items[selectedSuggestIndex]) {
                    const dUrl = items[selectedSuggestIndex].dataset.url;
                    if (dUrl) { window.loadUrl(dUrl); event.target.blur(); return; }
                    finalUrl = items[selectedSuggestIndex].dataset.text;
                }

                // Bang Shortcuts Implementation
                if (finalUrl.startsWith('!')) {
                    const parts = finalUrl.split(' ');
                    const bang = parts[0].toLowerCase();
                    const searchTerm = encodeURIComponent(parts.slice(1).join(' '));
                    if(bang === '!yt') finalUrl = 'https://www.youtube.com/results?search_query=' + searchTerm;
                    else if(bang === '!r') finalUrl = 'https://www.reddit.com/search/?q=' + searchTerm;
                    else if(bang === '!w') finalUrl = 'https://en.wikipedia.org/w/index.php?search=' + searchTerm;
                    else if(bang === '!a') finalUrl = 'https://www.amazon.com/s?k=' + searchTerm;
                }

                if (finalUrl === '/select') { window.loadUrl(finalUrl, true); event.target.blur(); return; }
                if (!/^https?:\/\//i.test(finalUrl) && !finalUrl.startsWith('/')) {
                    if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/.*)?$/.test(finalUrl) && !finalUrl.includes(' ')) { finalUrl = 'https://' + finalUrl; }
                    else { finalUrl = searchUrlFormatted(finalUrl); }
                }
                window.loadUrl(finalUrl); event.target.blur(); return;
            }
        }
 window.addEventListener("load", function () {

    const tabElements = document.querySelectorAll(".tab");

    if (tabElements.length === 0) {
        if (typeof addTab === "function") {
            addTab();
        } else if (typeof window.addTab === "function") {
            window.addTab();
        }
    }
        // DEV TOOLS
        window.openDevTools = function() {
            if (document.getElementById('hub-view').style.display === 'flex') { window.showToast('Open a webpage first', 'warning'); return; }
            const f = Array.from(canvasContainer.getElementsByTagName('iframe')).find(fr => fr.style.display !== 'none');
            if(!f) { window.showToast('No frame found', 'error'); return; }
            try {
                const fw = f.contentWindow; const fd = f.contentDocument || fw.document;
                if (fw.eruda && fw.eruda._isInit) { fw.eruda.show(); return; }
                window.showToast('Injecting DevTools...', 'info');
                const s = fd.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/eruda';
                s.onload = () => { try { fw.eruda.init(); fw.eruda.show(); fw.eruda._isInit = true; window.showToast('DevTools Ready', 'success'); } catch(e) { window.showToast('Blocked by site security', 'error'); } };
                s.onerror = () => window.showToast('Blocked by CSP', 'error'); fd.body.appendChild(s);
            } catch (e) { window.showToast('Blocked by Cross-Origin rules', 'error'); }
        }

        initBrowser();


});
    
