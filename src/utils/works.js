const GH = 'https://github.com/priyankraychura/';

export const CLOAK_REPO = `${GH}desktop_folder_locker`;
export const CLOAK_RELEASES = `${CLOAK_REPO}/releases/latest`;

export const categories = {
    app: 'Web app',
    tool: 'Tool',
    landing: 'Landing page',
    portfolio: 'Portfolio'
};

// img is the number of the screenshot in public/projects (thumbs/ and featured/ hold the WebP versions)
export const works = [
    { title: 'Food delivery website', category: 'app', tech: 'React', img: 1, live: 'https://food-delivery-react-web.vercel.app/', code: `${GH}FoodDelivery_ReactWeb` },
    { title: 'Game webflow template', category: 'landing', tech: 'Bootstrap', img: 2, live: 'https://gametemplatewebpage.netlify.app/', code: `${GH}GameWebflow_Webpage` },
    { title: 'Bridal webpage', category: 'landing', tech: 'CSS', img: 3, live: 'https://bridal-webpage.netlify.app/', code: `${GH}CSS_JQuery_Webpages/tree/main/Webpage-5` },
    { title: 'Weather app', category: 'tool', tech: 'JavaScript', img: 38, live: 'https://weather-app-js-project-virid.vercel.app/', code: `${GH}WeatherApp-JS-Project` },
    { title: 'Movie guide app', category: 'tool', tech: 'JavaScript', img: 32, live: 'https://movie-guide-js-project.vercel.app/', code: `${GH}MovieGuide-JS-Project` },
    { title: 'Graphic designer portfolio', category: 'portfolio', tech: 'Bootstrap', img: 4, live: 'https://designer-portfolio-beta.vercel.app/', code: `${GH}Designer_Portfolio` },
    { title: 'Web designer portfolio', category: 'portfolio', tech: 'Bootstrap', img: 5, live: 'https://creative-designer-portfolio.vercel.app/', code: `${GH}Creative_Designer_Portfolio` },
    { title: 'Freelance developer portfolio', category: 'portfolio', tech: 'Bootstrap', img: 6, live: 'https://freelancer-portfolio-wine.vercel.app/', code: `${GH}Freelancer_Portfolio` },
    { title: 'Designer portfolio', category: 'portfolio', tech: 'Bootstrap', img: 7, live: 'https://travor-james-portfolio.vercel.app/', code: `${GH}TravorJames_Portfolio` },
    { title: 'WordPress developer portfolio', category: 'portfolio', tech: 'Bootstrap', img: 8, live: 'https://wordpress-developer-portfolio.vercel.app/', code: `${GH}WordPress-Developer_Portfolio` },
    { title: 'Hotel booking', category: 'landing', tech: 'Bootstrap', img: 9, live: 'https://hotel-booking-webpage.vercel.app/', code: `${GH}HotelBooking_Webpage` },
    { title: 'Church services', category: 'landing', tech: 'Bootstrap', img: 10, live: 'https://church-services-webpage.vercel.app/', code: `${GH}ChurchServices_Webpage` },
    { title: 'Restaurant webpage', category: 'landing', tech: 'Bootstrap', img: 11, live: 'https://restaurant-webpage-ivory.vercel.app/', code: `${GH}Restaurant_Webpage` },
    { title: 'StudyBuddy', category: 'app', tech: 'Django', img: 12, live: '', code: `${GH}StudyBuddy-Django_Project` },
    { title: 'Personal blog', category: 'landing', tech: 'CSS', img: 13, live: 'https://life-blog-webpage.netlify.app/', code: `${GH}CSS_Webpages/tree/main/1_Blog_Webpage` },
    { title: 'Marketing webpage', category: 'landing', tech: 'CSS', img: 14, live: 'https://trademark-webpage.netlify.app/', code: `${GH}CSS_Webpages/tree/main/3_Trademark_Webpage` },
    { title: 'Mountain Man', category: 'landing', tech: 'CSS', img: 15, live: 'https://mountain-man.netlify.app/', code: `${GH}CSS_Webpages/tree/main/2_Mountain_Man_Webpage` },
    { title: 'Law firm', category: 'landing', tech: 'CSS', img: 16, live: 'https://lawfirm-webpage.netlify.app/', code: `${GH}CSS_Webpages/tree/main/4_Law_Firm_Webpage` },
    { title: 'DJ service', category: 'landing', tech: 'CSS', img: 17, live: 'https://dj-service.netlify.app/', code: `${GH}CSS_Webpages/tree/main/5_DJ_Service_Webpage` },
    { title: 'eCommerce website', category: 'landing', tech: 'CSS', img: 18, live: 'https://adalene-webpage.netlify.app/', code: `${GH}CSS_Webpages/tree/main/6_Adalene_Webpage` },
    { title: 'Coffee shop', category: 'landing', tech: 'CSS', img: 19, live: 'https://coffeeshop-webpage.netlify.app/', code: `${GH}CSS_Webpages/tree/main/7_Coffee_Webpage` },
    { title: 'Catering company', category: 'landing', tech: 'CSS', img: 20, live: 'https://catering-webpage.netlify.app/', code: `${GH}CSS_Webpages/tree/main/8_Catering_Webpage` },
    { title: 'Clothing eCommerce', category: 'landing', tech: 'CSS', img: 21, live: 'https://ethkl-webpage.netlify.app/', code: `${GH}CSS_Webpages/tree/main/9_Ethkl_Webpage` },
    { title: 'Gaming webpage', category: 'landing', tech: 'CSS', img: 22, live: 'https://game-webpage.netlify.app/', code: `${GH}CSS_Webpages/tree/main/10_Gaming_Webpage` },
    { title: 'Consultation website', category: 'landing', tech: 'CSS', img: 23, live: 'https://consultation-webpage.netlify.app/', code: `${GH}CSS_JQuery_Webpages/tree/main/Webpage-1` },
    { title: 'Publishing company', category: 'landing', tech: 'CSS', img: 24, live: 'https://publishing-co-webpage.netlify.app/', code: `${GH}CSS_JQuery_Webpages/tree/main/Webpage-2` },
    { title: 'SEO services', category: 'landing', tech: 'CSS', img: 25, live: 'https://seo-services-webpage.netlify.app/', code: `${GH}CSS_JQuery_Webpages/tree/main/Webpage-3` },
    { title: 'Bicycle repair shop', category: 'landing', tech: 'CSS', img: 26, live: 'https://bicycle-repair-shop.netlify.app/', code: `${GH}CSS_JQuery_Webpages/tree/main/Webpage-4` },
    { title: 'Science conference', category: 'landing', tech: 'CSS', img: 27, live: 'https://science-conferance.netlify.app/', code: `${GH}Science_Conferance_Webpage` },
    { title: 'Currency converter', category: 'tool', tech: 'JavaScript', img: 28, live: 'https://currency-converter-js-project.vercel.app/', code: `${GH}currencyConverter-JS-Project` },
    { title: 'Gradient generator', category: 'tool', tech: 'JavaScript', img: 29, live: 'https://gradient-generator-js-project.vercel.app/', code: `${GH}gradientGenerator-JS-Project` },
    { title: 'Image previewer', category: 'tool', tech: 'JavaScript', img: 30, live: 'https://image-previewer-js-project.vercel.app/', code: `${GH}ImagePreviewer-JS-Project` },
    { title: 'Is online checker', category: 'tool', tech: 'JavaScript', img: 31, live: 'https://is-online-checker-java-script-project.vercel.app/', code: `${GH}isOnlineChecker-JavaScriptProject` },
    { title: 'Palindrome checker', category: 'tool', tech: 'JavaScript', img: 33, live: 'https://palidrome-checker-js-project.vercel.app/', code: `${GH}PalidromeChecker-JS-Project` },
    { title: 'Password validator', category: 'tool', tech: 'JavaScript', img: 34, live: 'https://password-validator-js-project.vercel.app/', code: `${GH}PasswordValidator-JS-Project` },
    { title: 'QR code generator', category: 'tool', tech: 'JavaScript', img: 35, live: 'https://qr-code-generator-js-project-smoky.vercel.app/', code: `${GH}QRCodeGenerator-JS-Project` },
    { title: 'Random quote generator', category: 'tool', tech: 'JavaScript', img: 36, live: 'https://random-quote-generator-js-project.vercel.app/', code: `${GH}RandomQuoteGenerator-JS-Project` },
    { title: 'Stopwatch', category: 'tool', tech: 'JavaScript', img: 37, live: 'https://stopwatch-js-project-beta.vercel.app/', code: `${GH}Stopwatch-JS-Project` },
    { title: 'YouTube thumbnail downloader', category: 'tool', tech: 'JavaScript', img: 39, live: 'https://youtube-thumbnail-js-project.vercel.app/', code: `${GH}YouTubeThumbnail-JS-Project` },
];

// The six shown large in the home page gallery
export const featuredWorks = [
    {
        title: 'Food delivery website',
        img: 1,
        alt: 'Tomato food delivery site with an order-your-favourite-food banner',
        desc: 'A responsive food ordering site built with React.',
        tags: ['React', 'Responsive'],
        live: 'https://food-delivery-react-web.vercel.app/',
        code: `${GH}FoodDelivery_ReactWeb`
    },
    {
        title: 'StudyBuddy',
        img: 12,
        alt: "StudyBuddy's dark interface listing study rooms and recent activity",
        desc: 'A Django app where people join study rooms and discuss topics together.',
        tags: ['Django', 'Python', 'CSS'],
        live: '',
        code: `${GH}StudyBuddy-Django_Project`
    },
    {
        title: 'Movie guide app',
        img: 32,
        alt: 'Movie guide showing The Avengers with its rating, plot and cast',
        desc: 'Search any film to see its plot, cast and rating.',
        tags: ['JavaScript', 'API'],
        live: 'https://movie-guide-js-project.vercel.app/',
        code: `${GH}MovieGuide-JS-Project`
    },
    {
        title: 'Weather app',
        img: 38,
        alt: 'Weather app showing 32°C and overcast clouds in Ahmedabad',
        desc: 'Current weather for any city, with feels-like temperature and humidity.',
        tags: ['JavaScript', 'API'],
        live: 'https://weather-app-js-project-virid.vercel.app/',
        code: `${GH}WeatherApp-JS-Project`
    },
    {
        title: 'Gaming webpage',
        img: 22,
        alt: 'REVO eSports landing page with a burning planet hero',
        desc: 'A bold landing page for an eSports team, built with HTML and CSS.',
        tags: ['HTML', 'CSS'],
        live: 'https://game-webpage.netlify.app/',
        code: `${GH}CSS_Webpages/tree/main/10_Gaming_Webpage`
    },
    {
        title: 'Science conference',
        img: 27,
        alt: 'Science conference event site with a speaker on stage',
        desc: 'An event site for a science conference, with speakers and tickets.',
        tags: ['HTML', 'CSS'],
        live: 'https://science-conferance.netlify.app/',
        code: `${GH}Science_Conferance_Webpage`
    },
];

// Text in backticks renders as code (see Rich)
export const apps = [
    {
        id: 'cloak',
        name: 'Cloak',
        sub: 'Lock & encrypt folders',
        pill: 'Windows · Open source',
        icon: '/appIcons/cloak.webp',
        glow: 'var(--c-cloak)',
        desc: 'Turns any folder or file into a single encrypted `.flk` vault. Open it as a drive when you need it: files are decrypted in memory and never written to disk.',
        specs: [
            ['Encryption', 'XChaCha20-Poly1305'],
            ['Key derivation', 'Argon2id via libsodium'],
            ['Open as drive', 'Mounts as `V:`, in memory only'],
            ['Built with', 'Flutter + Rust'],
            ['License', 'GPL-3.0'],
            ['Code signing', 'SignPath Foundation']
        ],
        primary: { label: 'Download for Windows', href: CLOAK_RELEASES, icon: 'download' },
        links: [
            { label: 'Source on GitHub', href: CLOAK_REPO },
            { label: 'Product page', to: '/apps/cloak' }
        ]
    },
    {
        id: 'airkey',
        name: 'AirKey',
        sub: 'Smart passkey',
        pill: 'Windows + Android',
        icon: '/appIcons/airkey.webp',
        glow: 'var(--c-airkey)',
        desc: "Unlock and lock your Windows PC with your phone's fingerprint. Your fingerprint never leaves the phone, and your Windows password never leaves the PC.",
        specs: [
            ['Biometrics', 'Android Keystore, on the phone'],
            ['PC password', 'Encrypted with Windows DPAPI'],
            ['Pairing', 'Scan a QR code shown on the PC'],
            ['Connection', 'Wi-Fi, or an end-to-end encrypted relay'],
            ['Built with', 'Flutter + Rust'],
            ['Tracking', 'No ads, analytics or crash reports']
        ],
        links: [
            { label: 'Privacy policy', to: '/privacy-policy/airkey' }
        ]
    },
    {
        id: 'pushtimarg',
        name: 'Pushtimarg',
        sub: 'Aarti, Varta and Tithi',
        pill: 'Android · Google Play',
        icon: '/appIcons/pushtimarg.webp',
        glow: 'var(--c-pm)',
        desc: 'A companion app for the Pushtimarg community with Aarti lyrics, Varta and Tithi, always up to date and with no sign-up.',
        specs: [
            ['Built with', 'React Native'],
            ['Account', 'None needed'],
            ['Content', 'Fetched fresh from the server'],
            ['On device', 'Bookmarks and font settings']
        ],
        primary: { label: 'Get it on Google Play', href: 'https://play.google.com/store/apps/details?id=com.priyank.pushtimarg', icon: 'play' },
        links: [
            { label: 'Privacy policy', to: '/privacy-policy/pushtimarg' }
        ]
    },
];
