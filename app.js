/* ==========================================================================
   DASHBOARD CORE APPLICATION LOGIC - app.js
   ========================================================================== */

// ── DATA SOURCES ──
const WEBSITES_DATA = [
  { name: "Hackers-Arise", url: "https://www.hackers-arise.com", desc: "By Occupy The Web — in-depth tutorials and SCADA/Linux security deep-dives.", type: "Website", class: "tag-blue" },
  { name: "Hacking Articles", url: "https://www.hackingarticles.in", desc: "By Ignite Technologies India — massive archive of pentest writeups and lab guides.", type: "Website", class: "tag-blue" },
  { name: "Null-Byte", url: "https://null-byte.wonderhowto.com", desc: "Hacking tutorials, security guides, and whitehat programming exercises.", type: "Website", class: "tag-blue" },
  { name: "HackerSploit", url: "https://hackersploit.org", desc: "Penetration testing resources, security hardening, and red team frameworks.", type: "Website", class: "tag-blue" },
  { name: "Sevagas", url: "https://blog.sevagas.com", desc: "Advanced malware evasion, security research, and code exploit logs.", type: "Website", class: "tag-blue" },
  { name: "Ehacking", url: "https://www.ehacking.net", desc: "Hacking and information security articles covering breaches and techniques.", type: "Website", class: "tag-blue" },
  { name: "SANS Free Resources", url: "https://www.sans.org/security-resources/", desc: "Elite cybersecurity cheatsheets, templates, and free community resources.", type: "Free Portal", class: "tag-green" },
  { name: "Hacksplaining", url: "https://www.hacksplaining.com", desc: "Interactive security lessons explaining SQL injection, XSS, and session flaws.", type: "Website", class: "tag-blue" },
  { name: "LiveOverflow", url: "https://liveoverflow.com", desc: "CTF challenges, systems hacking, and high-quality binary exploitation diaries.", type: "Website", class: "tag-blue" },
  { name: "Infinite Logins", url: "https://infinitelogins.com", desc: "Walkthroughs and guides for HackTheBox, TryHackMe, and VulnHub machines.", type: "Website", class: "tag-blue" },
  { name: "Zsecurity", url: "https://zsecurity.org/hacking-and-security", desc: "Hacking, Kali Linux tutorials, and comprehensive defensive resources.", type: "Website", class: "tag-blue" }
];

const LABS_DATA = [
  { title: "TryHackMe", desc: "Beginner-friendly guided security paths and structured rooms." },
  { title: "HackTheBox", desc: "Real-world vulnerable machines, advanced laboratories, and CTFs." },
  { title: "HackThisSite", desc: "Classic web-based challenges covering SQL, scripting, and basic exploits." },
  { title: "Proving Grounds", desc: "OffSec practice machines designed for OSCP preparation." },
  { title: "VulnHub", desc: "Downloadable pre-configured vulnerable VMs for local offline testing." },
  { title: "Own VM Lab", desc: "Setting up custom Hyper-V / VirtualBox security testing grids locally." }
];

const REPOS_DATA = [
  { path: "fabionoth/awesome-cyber-security", url: "https://github.com/fabionoth/awesome-cyber-security", cat: "General", class: "tag-gray" },
  { path: "enaqx/awesome-pentest", url: "https://github.com/enaqx/awesome-pentest", cat: "Pentest", class: "tag-red" },
  { path: "wtsxDev/Penetration-Testing", url: "https://github.com/wtsxDev/Penetration-Testing", cat: "Pentest", class: "tag-red" },
  { path: "mgeeky/Penetration-Testing-Tools", url: "https://github.com/mgeeky/Penetration-Testing-Tools", cat: "Pentest", class: "tag-red" },
  { path: "juliocesarfort/public-pentesting-reports", url: "https://github.com/juliocesarfort/public-pentesting-reports", cat: "Pentest Reports", class: "tag-red" },
  { path: "hmaverickadams/Beginner-Network-Pentesting", url: "https://github.com/hmaverickadams/Beginner-Network-Pentesting", cat: "Networking", class: "tag-blue" },
  { path: "sundowndev/hacker-roadmap", url: "https://github.com/sundowndev/hacker-roadmap", cat: "Roadmap", class: "tag-gray" },
  { path: "PacktPublishing/Learn-Website-Hacking-Penetration-Testing-From-Scratch", url: "https://github.com/PacktPublishing/Learn-Website-Hacking-Penetration-Testing-From-Scratch", cat: "Pentest", class: "tag-red" },
  { path: "coreb1t/awesome-pentest-cheat-sheets", url: "https://github.com/coreb1t/awesome-pentest-cheat-sheets", cat: "Cheatsheet", class: "tag-red" },
  { path: "sbilly/awesome-security", url: "https://github.com/sbilly/awesome-security", cat: "General", class: "tag-gray" },
  { path: "Lissy93/personal-security-checklist", url: "https://github.com/Lissy93/personal-security-checklist", cat: "Privacy / Audit", class: "tag-green" },
  { path: "joe-shenouda/awesome-cyber-skills", url: "https://github.com/joe-shenouda/awesome-cyber-skills", cat: "Skills", class: "tag-gray" },
  { path: "carpedm20/awesome-hacking", url: "https://github.com/carpedm20/awesome-hacking", cat: "General", class: "tag-gray" },
  { path: "okhosting/awesome-cyber-security", url: "https://github.com/okhosting/awesome-cyber-security", cat: "General", class: "tag-gray" },
  { path: "theredditbandit/awesome-cybersec", url: "https://github.com/theredditbandit/awesome-cybersec", cat: "General", class: "tag-gray" },
  { path: "mbcrump/awesome-security", url: "https://github.com/mbcrump/awesome-security", cat: "General", class: "tag-gray" },
  { path: "fabacab/awesome-cybersecurity-blueteam", url: "https://github.com/fabacab/awesome-cybersecurity-blueteam", cat: "Blue Team", class: "tag-blue" },
  { path: "onlurking/awesome-infosec", url: "https://github.com/onlurking/awesome-infosec", cat: "InfoSec", class: "tag-gray" },
  { path: "harisqazi1/Cybersecurity", url: "https://github.com/harisqazi1/Cybersecurity", cat: "General", class: "tag-gray" },
  { path: "NIST Online Learning Content", url: "https://www.nist.gov/itl/applied-cybersecurity/nice/resources/online-learning-content", cat: "Education", class: "tag-purple" }
];

const PODCASTS_DATA = [
  { name: "Darknet Diaries", url: "https://darknetdiaries.com", notes: "Incredible true stories from hackers, defenders, and intelligence services." },
  { name: "The Cyber Wire", url: "https://thecyberwire.com", notes: "Huge collection of cybersecurity news briefings and executive podcasts." },
  { name: "Hacker Valley", url: "https://hackervalley.com", notes: "Explores the human side of security, careers, culture, and high-performance." },
  { name: "Social-Engineer", url: "https://www.social-engineer.org/podcasts", notes: "Social engineering deep-dives, behavioral psychology, and target analysis." },
  { name: "SANS Podcast", url: "https://isc.sans.edu/podcast", notes: "Daily security briefings and threat intelligence reports in 5 minutes." },
  { name: "Delinea", url: "https://delinea.com/events/podcasts", notes: "Identity security, enterprise access, and administrative control discussions." },
  { name: "Infosec-live", url: "https://www.youtube.com/c/infoseclive/featured", notes: "Live video recordings detailing threat updates and industry insights." },
  { name: "Red Team Podcasts", url: "https://www.podchaser.com/podcasts/red-team-podcast-585628", notes: "Offensive strategies, tool architectures, and red team methodology reviews." },
  { name: "CyberSecurity Today", url: "https://podcasts.apple.com/us/podcast/cybersecurity-today/id1363182054", notes: "IT security headlines, patches, and threat brief warnings." }
];

const PLATFORMS_DATA = [
  { title: "Cybrary", desc: "Comprehensive catalog of training and certification courses." },
  { title: "ITProTv", desc: "High-quality, engaging video tutorials covering general IT and cybersecurity." },
  { title: "EC-Council Codered", desc: "Dedicated practical ethically offensive and defensive labs." },
  { title: "OPSWAT Academy", desc: "OT and Critical Infrastructure protection training programs." },
  { title: "Udemy", desc: "Affordable catalog of community-built security lectures." },
  { title: "PluralSight", desc: "Technical skills tracking platform with massive code libraries." },
  { title: "Edx", desc: "University-level professional certificates and degree tracks." },
  { title: "Coursera", desc: "Enterprise certification pathways and high-level training." },
  { title: "FutureLearn", desc: "Interactive global academy hosting various academic classes." },
  { title: "SANS Community", desc: "Industry-leading elite courses and expert security instructions." },
  { title: "YouTube", desc: "Free video content hosting complete playlists and guides." },
  { title: "Google & Research", desc: "The ultimate platform. Curiosity and search queries represent your power." }
];

const CONFERENCES_DATA = [
  { name: "BlackHat", cat: "Global Scale / Offensive Research Focus", class: "tag-red" },
  { name: "DEF CON", cat: "Global Scale / Community Hacking Focus", class: "tag-red" },
  { name: "NullCon", cat: "Regional (India) Focus / In-Depth Technical Reviews", class: "tag-blue" },
  { name: "Hack In The Box", cat: "Global Scale / Research & Vulns Focus", class: "tag-gray" },
  { name: "BSides", cat: "Local Community Driven / Accessible Regional Security", class: "tag-green" },
  { name: "RSA Conference", cat: "Global Enterprise Scale / Defensive & Vendor Focus", class: "tag-gray" },
  { name: "ThreatCon", cat: "Regional Focus / Threat Intelligence Focus", class: "tag-gray" }
];

const NEWS_DATA = [
  { name: "Dark Reading", url: "https://www.darkreading.com", focus: "Enterprise Cybersecurity News", class: "tag-blue" },
  { name: "ThreatPost", url: "https://threatpost.com", focus: "Emerging Threats & Vulnerabilities", class: "tag-blue" },
  { name: "The Hacker News", url: "https://thehackernews.com", focus: "Global Breaches & Cyber Incidents", class: "tag-blue" },
  { name: "Infosec Writeups", url: "https://infosecwriteups.com/tagged/medium", focus: "Vulnerability Writeups & CTFs", class: "tag-purple" },
  { name: "ThreatNinja", url: "https://threatninja.net", focus: "HackTheBox Machine Writeups", class: "tag-purple" },
  { name: "GbHackers", url: "https://gbhackers.com", focus: "Technical Vulnerability Releases", class: "tag-blue" },
  { name: "CTF Writeups Medium", url: "https://medium.com/ctf-writeups/tagged/cybersecurity", focus: "Capture The Flag methodologies", class: "tag-purple" }
];

const SEARCH_ENGINES_DATA = [
  { name: "Pipl", cat: "Personal information", class: "tag-orange" },
  { name: "Censys", cat: "Network mapping service", class: "tag-blue" },
  { name: "CRT sh", cat: "URL Certificate report", class: "tag-purple" },
  { name: "Cyber Background Checks", cat: "Personal information", class: "tag-orange" },
  { name: "DeHashed", cat: "Personal information", class: "tag-orange" },
  { name: "Grep App", cat: "GIT Map", class: "tag-gray" },
  { name: "Keyword Shitter", cat: "Marketing keyword", class: "tag-gray" },
  { name: "Google AdWords", cat: "Marketing keyword", class: "tag-gray" },
  { name: "GrayHatWarefare", cat: "open S3 buckets database", class: "tag-purple" },
  { name: "EPIEOS", cat: "Personal information", class: "tag-orange" },
  { name: "FullHunt", cat: "URL IP report", class: "tag-blue" },
  { name: "HaveIBeenPwned", cat: "Personal leaks audit", class: "tag-orange" },
  { name: "Hunter", cat: "Email report", class: "tag-purple" },
  { name: "Intelligence x", cat: "Email IP report", class: "tag-blue" },
  { name: "Keyword Tool", cat: "Marketing keyword", class: "tag-gray" },
  { name: "KWFinder", cat: "Marketing keyword", class: "tag-gray" },
  { name: "LeakIX", cat: "URL IP Report / Leaked Data", class: "tag-purple" },
  { name: "Firefox Monitor", cat: "Personal leaks audit", class: "tag-orange" },
  { name: "Natlas", cat: "IP Scanner", class: "tag-blue" },
  { name: "Netlas", cat: "IP Scanner", class: "tag-blue" },
  { name: "Nuclear Leaks", cat: "OSINT Directory", class: "tag-gray" },
  { name: "OSINT Framework", cat: "OSINT Directory", class: "tag-gray" },
  { name: "Packet Storm Security", cat: "Exploits database", class: "tag-red" },
  { name: "PolySwarm", cat: "URL Files Threat Report", class: "tag-purple" },
  { name: "PublicWWW", cat: "Marketing keyword", class: "tag-gray" },
  { name: "Pulsedive", cat: "URL IP Threat Report", class: "tag-red" },
  { name: "SecurityTrails", cat: "URL IP DNS Report", class: "tag-blue" },
  { name: "Tineye", cat: "Reverse Image", class: "tag-gray" },
  { name: "URL Scan", cat: "URL IP sandbox scan", class: "tag-blue" },
  { name: "Vulners", cat: "Exploits database", class: "tag-red" },
  { name: "Binary Edge", cat: "IP Port Scanner Report", class: "tag-blue" },
  { name: "Criminal IP", cat: "IP Threat intelligence report", class: "tag-red" },
  { name: "Grey Noise", cat: "Internet background scanning noise", class: "tag-blue" },
  { name: "Keyword discover", cat: "Marketing keyword", class: "tag-gray" },
  { name: "Onyphe", cat: "IP Port Threat intelligence", class: "tag-red" },
  { name: "Shodan", cat: "Internet of Things (IoT) Scanner", class: "tag-purple" },
  { name: "ZoomEye", cat: "Network mapping scanner", class: "tag-blue" },
  { name: "WiGLE", cat: "Global Wireless/WiFi Network Map", class: "tag-purple" },
  { name: "OSINT-Link", cat: "OSINT Directory", class: "tag-gray" },
  { name: "SignalHire", cat: "Personal corporate recruitment OSINT", class: "tag-orange" },
  { name: "sploitus", cat: "Exploits database", class: "tag-red" },
  { name: "exploit-db", cat: "Exploits database", class: "tag-red" },
  { name: "CVE Details", cat: "Exploits database", class: "tag-red" },
  { name: "nmmapper", cat: "Exploits database", class: "tag-red" },
  { name: "Vulmon", cat: "Exploits database", class: "tag-red" },
  { name: "exploits.shodan", cat: "Exploits database", class: "tag-red" },
  { name: "vulnerability-lab", cat: "Exploits database", class: "tag-red" },
  { name: "Airport webcams", cat: "Airport Webcams", class: "tag-green" },
  { name: "Insecam", cat: "Live IP Webcams directory", class: "tag-green" },
  { name: "Lookr", cat: "Weather Webcams", class: "tag-green" },
  { name: "Earthcam", cat: "Live streaming Webcams", class: "tag-green" },
  { name: "Opentopia", cat: "Live Webcams database", class: "tag-green" },
  { name: "Pictimo", cat: "Webcams", class: "tag-green" },
  { name: "Webcam-nl (NL)", cat: "Netherlands Webcams", class: "tag-green" },
  { name: "Webcams-travel", cat: "Travel Webcams", class: "tag-green" },
  { name: "Worldcam", cat: "Global Webcams directory", class: "tag-green" }
];

const ICS_RESOURCES_DATA = [
  { name: "Fundamentals of ICS/SCADA CyberSecurity (Udemy)", details: "Paid - Outstanding starter course on OT architectures." },
  { name: "Practical Industrial Control System Penetration Testing (Udemy)", details: "Paid - Highly recommended hands-on hacking guide." },
  { name: "Hacker-Arise Scada Hacking Portal", details: "Free/Paid - Deep-dive Scada walkthroughs and tools." },
  { name: "kh4sh3i/ICS-Pentesting-Tools", details: "GitHub - Curated script toolkit for industrial networks." },
  { name: "hslatman/awesome-industrial-control-system-security", details: "GitHub - Extremely comprehensive list of OT security." },
  { name: "ITI/ICS-Security-Tools", details: "GitHub - Network audit and protocol evaluation tools." },
  { name: "miguelob/ICS-Hacking", details: "GitHub - Repository housing common PLC exploit codes." },
  { name: "neutrinoguy/awesome-ics-writeups", details: "GitHub - Real world incident writeups and reports." },
  { name: "SANS ICS (YouTube)", details: "Free - SANS Industrial control system presentations." },
  { name: "ICS Village (YouTube)", details: "Free - Interactive hacking showcases and lectures." },
  { name: "controlthings.io", details: "Free/Paid - Elite specialized OT security tools and classes." },
  { name: "CISA's Virtual Training Portal", details: "Free - Highly detailed US CISA cybersecurity labs." }
];

const RED_RESOURCES_DATA = [
  { path: "infosecn1nja/Red-Teaming-Toolkit", details: "GitHub - Curated list of red team offensive ops scripts." },
  { path: "oddvar.moe", details: "Blog - Exceptional research on Windows bypasses and LOLBAS." },
  { path: "yeyintminthuhtut/Awesome-Red-Teaming", details: "GitHub - Complete AD evasion and attack guide." },
  { path: "bigb0sss/RedTeam-OffensiveSecurity", details: "GitHub - Operations playbooks and loader code." },
  { path: "CyberSecurityUP/Awesome-Red-Team-Operations", details: "GitHub - Administrative frameworks and tools." },
  { path: "Red-Team Infrastructure Wiki", details: "Wiki - Standard handbook on constructing secure command & control (C2)." },
  { path: "MITRE ATT&CK Framework", details: "Reference - Ultimate dictionary of adversary tactics, techniques, and procedures." }
];

const WEB_RESOURCES_DATA = [
  { name: "PortSwigger Web Security Academy", details: "Free/Practical - The gold standard of web application security training." },
  { name: "Packt: Learn Website Hacking from Scratch", details: "GitHub - Accompanying codes for website pentesting." },
  { name: "infoslack/awesome-web-hacking", details: "GitHub - Exhaustive reference for web exploitation." },
  { name: "qazbnm456/awesome-web-security", details: "GitHub - Multi-featured lists of defensive web configurations." },
  { name: "Hari-prasaanth/Web-App-Pentest-Checklist", details: "GitHub - Detailed checklists for manual API/web reviews." },
  { name: "OWASP Juice Shop", details: "GitHub - Modern, vulnerable Node/JS app for practicing vulnerabilities." }
];

const EXPLOIT_RESOURCES_DATA = [
  { name: "wtsxDev/Exploit-Development", details: "GitHub - Organized assembly and buffer overflow guides." },
  { name: "DayZero Security Exploit Dev Introduction", details: "Blog - Accessible, comprehensive startup guide." },
  { name: "LiveOverflow YouTube Binary Playlist", details: "YouTube - Visual deep-dives into assembly and stack structures." },
  { name: "Corelan Team Exploit Tutorials", details: "Blog/Tutorials - The absolute masterclass reference for Windows stack exploitation." },
  { name: "FuzzySecurity Exploit Development Guides", details: "Blog/Tutorials - Outstanding practical guides covering heaps and kernel bypasses." },
  { name: "PinkDraconian Binary Exploitation", details: "YouTube - Accessible, walk-through tutorials mapping shellcode creation." }
];

const GLOSSARY_DATA = {
  "IP Addressing (IPv4/IPv6)": {
    def: "Internet Protocol addressing represents numerical labels assigned to each device on a network. IPv4 uses 32-bit addresses written in decimal (e.g. 192.168.1.1), while IPv6 uses 128-bit addresses in hexadecimal (e.g. 2001:db8::ff00:42:8329).",
    use: "Crucial for routing packets and identifying target systems during vulnerability scanning."
  },
  "Subnetting & CIDR": {
    def: "Subnetting is the practice of dividing a network into smaller, logical sub-networks (subnets). CIDR (Classless Inter-Domain Routing) notation specifies IP ranges and allocation sizes (e.g. /24 implies 256 addresses).",
    use: "Used to audit network segment boundaries and isolate sensitive domains."
  },
  "MAC Addressing": {
    def: "Media Access Control addresses represent unique 48-bit physical identifiers burned into network interface cards (NICs) at factory state.",
    use: "Utilized for local network communications (Layer 2) and target spoofing/filtering analysis."
  },
  "What is ISP": {
    def: "An Internet Service Provider is a commercial organization providing routing gateways and bandwidth to access the global internet infrastructure.",
    use: "Relevant when studying routing path redirections or analyzing network traffic hops."
  },
  "TCP/IP Model": {
    def: "A functional, 4-layer network model representing local link, internet routing, host-to-host transport, and application layers.",
    use: "Serves as the structural framework for organizing cybersecurity defense filters."
  },
  "OSI Model": {
    def: "A theoretical 7-layer communication model describing Physical, Data Link, Network, Transport, Session, Presentation, and Application functions.",
    use: "Used in security audits to classify attack vectors (e.g. Layer 3 DDoS vs Layer 7 Web Flaws)."
  },
  "WAN / LAN / PAN / MAN": {
    def: "Architectural classifications of network geographic reach: Wide Area (Global), Local Area (Home/Office), Personal Area (Bluetooth/Local Hops), and Metropolitan Area (City).",
    use: "Determines threat boundary sizes and configuration parameters during audits."
  },
  "Access Point / Router / WiFi": {
    def: "Hardware elements: Routers direct packets between networks (Layer 3); Access Points extend LAN domains wirelessly; WiFi refers to the 802.11 radio communication standards.",
    use: "Targeted in wireless penetration testing and local network infiltration audits."
  },
  "MTU": {
    def: "Maximum Transmission Unit represents the largest protocol data unit size in bytes (typically 1500 for Ethernet) that can traverse a network link without fragmentation.",
    use: "Exploited in bypass techniques like packet fragmentation to slip past firewalls."
  },
  "TCP 3-Way Handshake": {
    def: "The reliable synchronization sequence (SYN -> SYN-ACK -> ACK) executed between hosts to establish an active TCP session.",
    use: "Targeted in SYN flood DDoS attacks and analyzed in TCP port scanner engines (e.g. Nmap)."
  },
  "UDP": {
    def: "User Datagram Protocol is a lightweight, stateless, connectionless Layer 4 protocol. It does not guarantee delivery or packet order, sacrificing reliability for extreme speed.",
    use: "Commonly used in DNS, video streams, and targeted in UDP reflection amplification attacks."
  },
  "ICMP": {
    def: "Internet Control Message Protocol is an IP helper protocol used by routers and hosts for diagnostic and error reporting (e.g. Ping, Traceroute).",
    use: "Audited to map alive nodes in a network (Ping sweeps) and trace routing paths."
  },
  "DNS Protocol": {
    def: "Domain Name System is the application protocol translating human-readable hostname queries (e.g., example.com) to machine-readable numerical IP destinations.",
    use: "Targeted in DNS spoofing, cache poisoning, and heavily audited for exfiltration tunnels."
  },
  "ARP": {
    def: "Address Resolution Protocol translates local network IP requests (Layer 3) into hardware MAC destinations (Layer 2) inside subnets.",
    use: "Targeted in ARP Spoofing / Man-In-The-Middle (MITM) local network sniffers."
  },
  "Broadcasting": {
    def: "A transmission method delivering a data packet to every device on a local network segment concurrently (e.g., broadcast IP 255.255.255.255).",
    use: "Analyzed to sniff local discovery services or execute spoofing responses (e.g. Responder)."
  },
  "Bits, Bytes & Packets": {
    def: "The components of network traffic: Bits are individual binary states (0/1); Bytes are 8-bit collections; Packets are structured blocks of bytes containing headers and data payloads.",
    use: "Inspected inside packet analysis tools like Wireshark to find plaintext payloads."
  },
  "Fragmentation": {
    def: "The process of slicing a large packet into smaller fragments to travel through a link with a smaller MTU size, then reassembling it at the target.",
    use: "Used to evade Intrusion Detection Systems (IDS) which fail to properly reassemble and inspect fragmented packets."
  },
  "VPN & SOCKS Proxy": {
    def: "An encrypted tunnel (VPN) that routes all host traffic securely through a remote gateway, or a circuit-level proxy (SOCKS) that relays specific application socket data.",
    use: "Essential for hiding operator origins or pivoting inside compromised networks (Proxychains)."
  },
  "DNS Servers": {
    def: "Infrastructure systems (e.g., Cloudflare 1.1.1.1, Google 8.8.8.8) that receive, resolve, and cache DNS protocol translation records globally.",
    use: "Monitored to audit corporate outbound connections and look for indicators of compromise (IOCs)."
  },
  "Routing": {
    def: "The process of selecting optimal paths in a network to direct packets across multiple gateway nodes from source to target destination.",
    use: "Audited in border gateway protocol (BGP) security checks and lateral movement paths."
  },
  "Port Numbers & Services": {
    def: "Transport layer address parameters (0-65535) linking logical sockets to active applications (e.g., Port 22 for SSH, Port 80 for HTTP).",
    use: "The primary target of network footprinting. Port scanning maps open gateways on systems."
  },
  "FTP": {
    def: "File Transfer Protocol is a legacy TCP service running on port 21 used to copy files between hosts. Payloads are transmitted in cleartext.",
    use: "Highly susceptible to credential sniffing and anonymous access configuration audits."
  },
  "SMTP / POP3 / IMAP": {
    def: "Standard email suite protocols. SMTP (port 25) relays mail; IMAP (port 143) and POP3 (port 110) manage remote inbox synchronization.",
    use: "Inspected to block phishing distribution channels and audit mail relay configurations."
  },
  "HTTP / HTTPS": {
    def: "Hypertext Transfer Protocol (port 80) and its secure encrypted counterpart HTTPS (port 443) wrapper using SSL/TLS.",
    use: "The core domain of Web Application Pentesting and traffic sniffing evaluations."
  },
  "URL Structure": {
    def: "Uniform Resource Locator format specifying protocol schemes, credentials, hostdomains, port overrides, path paths, and query string arguments.",
    use: "Inspected for structural security injection vectors like parameter manipulations."
  },
  "Port Forwarding": {
    def: "A configuration routing outside incoming connections on a public WAN port directly to a specific internal private LAN IP address and port.",
    use: "Used to expose local payloads (like reverse shells) to the public internet securely."
  },
  "Packet Header Format": {
    def: "The structured starting blocks of packets containing protocol controls, flags (SYN/FIN/RST), source IPs, and target ports.",
    use: "Manipulated in advanced evasion attacks to build custom packet shapes (e.g. Scapy)."
  },
  "SNMP / DHCP": {
    def: "DHCP leases dynamic IPs automatically inside LAN segments. SNMP is used to monitor, query, and configure network nodes remotely.",
    use: "DHCP is vulnerable to exhaustion attacks. SNMP community strings are audited for info disclosure."
  },
  "Network Topology": {
    def: "The structural arrangement of network nodes and links, classified into Star, Ring, Mesh, Bus, or Hybrid configurations.",
    use: "Helps design resilient defense nodes and isolate compromised segments."
  },
  "Physical Cables": {
    def: "Transmission mediums carrying network signals physically: copper Ethernet (Cat5/Cat6) or fast Fiber-Optic strands.",
    use: "Targeted in localized physical security tests via network tap implants (e.g. Hak5 Plunder Bug)."
  },
  "Firewalls / IDS / IPS": {
    def: "Defensive systems. Firewalls block ports; Intrusion Detection Systems (IDS) alert on malicious traffic signatures passively; Intrusion Prevention Systems (IPS) drop matching threat packets actively.",
    use: "Offensive tools (like Nmap fragmentation and obfuscation) are crafted to bypass these blocks."
  }
};

// ── APP STATE ──
let bookmarkedItems = JSON.parse(localStorage.getItem('cybersec_bookmarks')) || [];
let completedPrereqs = JSON.parse(localStorage.getItem('cybersec_prereqs')) || [];

// ── DOM MOUNT ON LOAD ──
document.addEventListener('DOMContentLoaded', () => {
  // Mount elements
  renderWebsites();
  renderLabs();
  renderRepos();
  renderPodcasts();
  renderPlatforms();
  renderConferences();
  renderNews();
  renderSearchEngines();
  renderNetworkingChips();
  
  renderDomainTables();

  // Load Saved Progress
  updateProgressTracker();
  updateBookmarkCount();
  
  // Threat Intel Loop
  initThreatIntel();

  // SPA Router Trigger
  handleRouting();
});

// Bind routing listener
window.addEventListener('hashchange', handleRouting);

// ── UTILITIES: BOOKMARK TOGGLE ──
function toggleBookmark(itemId, type) {
  const bookmarkKey = `${type}_${itemId}`;
  const index = bookmarkedItems.indexOf(bookmarkKey);
  
  if (index === -1) {
    bookmarkedItems.push(bookmarkKey);
  } else {
    bookmarkedItems.splice(index, 1);
  }
  
  localStorage.setItem('cybersec_bookmarks', JSON.stringify(bookmarkedItems));
  updateBookmarkCount();
  
  // Rerender active lists
  if (type === 'website') renderWebsites();
  if (type === 'repo') renderRepos();
  if (type === 'podcast') renderPodcasts();
  if (type === 'conference') renderConferences();
  if (type === 'news') renderNews();
}

function updateBookmarkCount() {
  const countEl = document.getElementById('stat-bookmarks');
  if (countEl) {
    countEl.innerText = bookmarkedItems.length;
  }
}

// ── UTILITIES: PROGRESS TRACKER ──
function togglePrereq(id) {
  const index = completedPrereqs.indexOf(id);
  const row = document.querySelector(`#prereq-tbody tr:nth-child(${id})`);
  
  if (index === -1) {
    completedPrereqs.push(id);
    if (row) row.classList.add('completed');
  } else {
    completedPrereqs.splice(index, 1);
    if (row) row.classList.remove('completed');
  }
  
  localStorage.setItem('cybersec_prereqs', JSON.stringify(completedPrereqs));
  updateProgressTracker();
}

function updateProgressTracker() {
  const total = 6;
  const completed = completedPrereqs.length;
  const percentage = Math.round((completed / total) * 100);
  
  const fillEl = document.getElementById('milestone-progress');
  const percentEl = document.getElementById('milestone-percentage');
  
  if (fillEl) fillEl.style.width = `${percentage}%`;
  if (percentEl) percentEl.innerText = `${percentage}%`;
  
  // Update table row classes on load
  completedPrereqs.forEach(id => {
    const row = document.querySelector(`#prereq-tbody tr:nth-child(${id})`);
    if (row) row.classList.add('completed');
  });
}

// ── DYNAMIC RENDERING FUNCTIONS ──

function renderWebsites(filterQuery = "") {
  const tbody = document.getElementById('tbody-websites');
  if (!tbody) return;
  tbody.innerHTML = "";
  
  const filtered = WEBSITES_DATA.filter(item => 
    item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(filterQuery.toLowerCase())
  );
  
  document.getElementById('websites-cnt').innerText = filtered.length;
  
  filtered.forEach((item, index) => {
    const isBookmarked = bookmarkedItems.includes(`website_${index}`);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><a class="cell-link" href="${item.url}" target="_blank">${item.name} ↗</a></td>
      <td class="cell-muted">${item.url.replace("https://www.", "").replace("https://", "")}</td>
      <td>${item.desc}</td>
      <td><span class="tag ${item.class}">${item.type}</span></td>
      <td style="text-align: center;">
        <button class="btn btn-default btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark(${index}, 'website')" title="Bookmark Resource">
          ${isBookmarked ? '★' : '☆'}
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function renderLabs(filterQuery = "") {
  const grid = document.getElementById('grid-labs');
  if (!grid) return;
  grid.innerHTML = "";
  
  const filtered = LABS_DATA.filter(item => 
    item.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(filterQuery.toLowerCase())
  );
  
  document.getElementById('labs-cnt').innerText = filtered.length;
  
  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = "grid-card";
    card.innerHTML = `
      <div class="grid-card-header">
        <div class="grid-card-title">${item.title}</div>
        <span class="tag tag-blue">Practice Lab</span>
      </div>
      <div class="grid-card-desc">${item.desc}</div>
      <div class="grid-card-footer">
        <span class="cell-link" style="font-size:11.5px;">Initialize Access →</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderRepos(filterQuery = "") {
  const tbody = document.getElementById('tbody-repos');
  if (!tbody) return;
  tbody.innerHTML = "";
  
  const filtered = REPOS_DATA.filter(item => 
    item.path.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.cat.toLowerCase().includes(filterQuery.toLowerCase())
  );
  
  document.getElementById('repos-cnt').innerText = filtered.length;
  
  filtered.forEach((item, index) => {
    const isBookmarked = bookmarkedItems.includes(`repo_${index}`);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><a class="cell-link" href="${item.url}" target="_blank">${item.path} ↗</a></td>
      <td><span class="tag ${item.class}">${item.cat}</span></td>
      <td style="text-align: center;">
        <button class="btn btn-default btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark(${index}, 'repo')" title="Bookmark Repo">
          ${isBookmarked ? '★' : '☆'}
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function renderPodcasts(filterQuery = "") {
  const tbody = document.getElementById('tbody-podcasts');
  if (!tbody) return;
  tbody.innerHTML = "";
  
  const filtered = PODCASTS_DATA.filter(item => 
    item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.notes.toLowerCase().includes(filterQuery.toLowerCase())
  );
  
  document.getElementById('podcasts-cnt').innerText = filtered.length;
  
  filtered.forEach((item, index) => {
    const isBookmarked = bookmarkedItems.includes(`podcast_${index}`);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${item.name}</strong></td>
      <td><a class="cell-link" href="${item.url}" target="_blank">${item.url.replace("https://", "")} ↗</a></td>
      <td class="cell-muted">${item.notes}</td>
      <td style="text-align: center;">
        <button class="btn btn-default btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark(${index}, 'podcast')" title="Bookmark Podcast">
          ${isBookmarked ? '★' : '☆'}
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function renderPlatforms(filterQuery = "") {
  const grid = document.getElementById('grid-platforms');
  if (!grid) return;
  grid.innerHTML = "";
  
  const filtered = PLATFORMS_DATA.filter(item => 
    item.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(filterQuery.toLowerCase())
  );
  
  document.getElementById('platforms-cnt').innerText = filtered.length;
  
  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = "grid-card";
    card.innerHTML = `
      <div class="grid-card-header">
        <div class="grid-card-title">${item.title}</div>
        <span class="tag tag-purple">Platform</span>
      </div>
      <div class="grid-card-desc">${item.desc}</div>
    `;
    grid.appendChild(card);
  });
}

function renderConferences(filterQuery = "") {
  const tbody = document.getElementById('tbody-conferences');
  if (!tbody) return;
  tbody.innerHTML = "";
  
  const filtered = CONFERENCES_DATA.filter(item => 
    item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.cat.toLowerCase().includes(filterQuery.toLowerCase())
  );
  
  document.getElementById('conferences-cnt').innerText = filtered.length;
  
  filtered.forEach((item, index) => {
    const isBookmarked = bookmarkedItems.includes(`conference_${index}`);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${item.name}</strong></td>
      <td><span class="tag ${item.class}">${item.cat}</span></td>
      <td style="text-align: center;">
        <button class="btn btn-default btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark(${index}, 'conference')" title="Bookmark Conf">
          ${isBookmarked ? '★' : '☆'}
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function renderNews(filterQuery = "") {
  const tbody = document.getElementById('tbody-news');
  if (!tbody) return;
  tbody.innerHTML = "";
  
  const filtered = NEWS_DATA.filter(item => 
    item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.focus.toLowerCase().includes(filterQuery.toLowerCase())
  );
  
  document.getElementById('news-cnt').innerText = filtered.length;
  
  filtered.forEach((item, index) => {
    const isBookmarked = bookmarkedItems.includes(`news_${index}`);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${item.name}</strong></td>
      <td><a class="cell-link" href="${item.url}" target="_blank">${item.url.replace("https://www.", "").replace("https://", "")} ↗</a></td>
      <td><span class="tag ${item.class}">${item.focus}</span></td>
      <td style="text-align: center;">
        <button class="btn btn-default btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" onclick="toggleBookmark(${index}, 'news')" title="Bookmark News">
          ${isBookmarked ? '★' : '☆'}
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function renderSearchEngines(filterQuery = "") {
  const grid = document.getElementById('grid-search-engines');
  if (!grid) return;
  grid.innerHTML = "";
  
  const filtered = SEARCH_ENGINES_DATA.filter(item => 
    item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.cat.toLowerCase().includes(filterQuery.toLowerCase())
  );
  
  document.getElementById('se-cnt').innerText = filtered.length;
  
  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = "se-card";
    card.innerHTML = `
      <div class="se-header">
        <span class="se-name">${item.name}</span>
        <span class="tag ${item.class}">${item.cat}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderNetworkingChips() {
  const container = document.getElementById('networking-chips-container');
  if (!container) return;
  container.innerHTML = "";
  
  Object.keys(GLOSSARY_DATA).forEach(term => {
    const chip = document.createElement('span');
    chip.className = "chip";
    chip.innerText = term;
    chip.onclick = () => openGlossaryDrawer(term);
    container.appendChild(chip);
  });
}

// ── DOMAINS SECTION POPULATOR ──
function renderDomainTables() {
  // ICS
  const icsTbody = document.getElementById('tbody-ics-resources');
  if (icsTbody) {
    icsTbody.innerHTML = "";
    ICS_RESOURCES_DATA.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${item.name}</strong></td>
        <td class="cell-muted">${item.details}</td>
      `;
      icsTbody.appendChild(tr);
    });
  }

  // Red Team
  const redTbody = document.getElementById('tbody-red-resources');
  if (redTbody) {
    redTbody.innerHTML = "";
    RED_RESOURCES_DATA.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${item.path}</strong></td>
        <td class="cell-muted">${item.details}</td>
      `;
      redTbody.appendChild(tr);
    });
  }

  // Web
  const webTbody = document.getElementById('tbody-web-resources');
  if (webTbody) {
    webTbody.innerHTML = "";
    WEB_RESOURCES_DATA.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${item.name}</strong></td>
        <td class="cell-muted">${item.details}</td>
      `;
      webTbody.appendChild(tr);
    });
  }

  // Exploit
  const expTbody = document.getElementById('tbody-exploit-resources');
  if (expTbody) {
    expTbody.innerHTML = "";
    EXPLOIT_RESOURCES_DATA.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${item.name}</strong></td>
        <td class="cell-muted">${item.details}</td>
      `;
      expTbody.appendChild(tr);
    });
  }
}

// ── GLOBAL SEARCH CONTROLLER ──
function filterAllResources(val) {
  renderWebsites(val);
  renderLabs(val);
  renderRepos(val);
  renderPodcasts(val);
  renderPlatforms(val);
  renderConferences(val);
  renderNews(val);
  renderSearchEngines(val);
}

// ── GLOSSARY DRAWER CONTROLS ──
function openGlossaryDrawer(term) {
  const drawer = document.getElementById('glossaryDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const title = document.getElementById('drawerTitle');
  const content = document.getElementById('drawerContent');
  
  if (!drawer || !overlay) return;
  
  const data = GLOSSARY_DATA[term];
  title.innerText = term;
  content.innerHTML = `
    <div class="drawer-section">
      <h4>Description & Definitions</h4>
      <div class="drawer-desc">${data.def}</div>
    </div>
    <div class="drawer-section">
      <h4>Vulnerability / Cybersecurity Auditing Use-Case</h4>
      <div class="drawer-highlight">${data.use}</div>
    </div>
    <div class="drawer-section">
      <h4>Recommended Learning Channel</h4>
      <div class="drawer-desc" style="font-size:12.5px;color:var(--text-secondary);">Search for "<strong>${term} cybersecurity basics</strong>" on YouTube or read the SANS Network cheatsheets.</div>
    </div>
  `;
  
  drawer.classList.add('open');
  overlay.classList.add('open');
}

function closeDrawer() {
  const drawer = document.getElementById('glossaryDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
}

// ── INTERACTIVE TAB CONTROLLERS ──
function switchLangTab(tabId, btn) {
  const section = document.getElementById('languages');
  const buttons = section.querySelectorAll('.tab');
  const contents = section.querySelectorAll('.tab-content');
  
  buttons.forEach(b => b.classList.remove('active'));
  contents.forEach(c => c.classList.remove('active'));
  
  btn.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

function switchDomainTab(domain, tabId, btn) {
  let sectionId = 'ics';
  if (domain === 'red') sectionId = 'redteam';
  if (domain === 'web') sectionId = 'webapp';
  if (domain === 'exploit') sectionId = 'exploit';
  
  const section = document.getElementById(sectionId);
  const buttons = section.querySelectorAll('.tab');
  const contents = section.querySelectorAll('.tab-content');
  
  buttons.forEach(b => b.classList.remove('active'));
  contents.forEach(c => c.classList.remove('active'));
  
  btn.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// ── ACTIVE NAVIGATION LINKS HIGHLIGHT ──
function setActiveLink(link) {
  // Let hashchange event handle all routing, this is a placeholder/fallback
}

// ── SPA ROUTER LOGIC ──
function handleRouting() {
  const hash = window.location.hash || '#overview';
  
  // Resolve active view container ID
  let activeId = 'view-dashboard';
  if (hash === '#overview' || hash === '#view-dashboard' || hash === '#') {
    activeId = 'view-dashboard';
  } else {
    // Strip '#'
    const targetId = hash.replace('#', '');
    if (document.getElementById(targetId)) {
      activeId = targetId;
    }
  }

  // Toggle active-view class on all tab-views
  const tabViews = document.querySelectorAll('.tab-view');
  tabViews.forEach(view => {
    if (view.id === activeId) {
      view.classList.add('active-view');
    } else {
      view.classList.remove('active-view');
    }
  });

  // Highlight active link in sidebar
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  let sidebarFound = false;
  sidebarLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === hash || (hash === '#overview' && href === '#overview') || (hash === '#' && href === '#overview')) {
      link.classList.add('active');
      sidebarFound = true;
      // Set breadcrumb
      const name = link.innerText.trim();
      document.getElementById('bread-current').innerText = name;
    } else {
      link.classList.remove('active');
    }
  });

  // If sidebar link wasn't highlighted by hash directly, map it to the active view ID
  if (!sidebarFound) {
    sidebarLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + activeId) {
        link.classList.add('active');
        const name = link.innerText.trim();
        document.getElementById('bread-current').innerText = name;
      }
    });
  }

  // Highlight active link in top nav
  const topNavLinks = document.querySelectorAll('.top-nav .nav-items .nav-item');
  topNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    // Check direct match
    if (href === hash || (hash === '#overview' && href === '#overview') || (hash === '#' && href === '#overview') ||
        (href === '#overview' && ['view-dashboard', 'keypoints', 'learning', 'careers', 'prereqs', 'languages', 'networking'].includes(activeId))) {
      link.classList.add('active');
    } else {
      // Sub-mappings for Resources, Tools, Domains tabs
      if (href === '#websites' && ['websites', 'labs', 'github-repos', 'podcasts', 'platforms', 'conferences', 'news'].includes(activeId)) {
        link.classList.add('active');
      } else if (href === '#searchengines' && activeId === 'searchengines') {
        link.classList.add('active');
      } else if (href === '#ics' && ['ics', 'redteam', 'webapp', 'exploit'].includes(activeId)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });

  // Scroll to top of content panel smoothly
  const contentArea = document.querySelector('.content');
  if (contentArea) {
    contentArea.scrollTop = 0;
  }
  window.scrollTo(0, 0);
}

// ==========================================================================
// REAL-TIME THREAT INTEL SIMULATION ENGINE
// ==========================================================================

const CRITICAL_CAMPAIGNS = [
  { title: "Volt Typhoon sweep targeting OT systems", target: "US Power Infrastructure", threatActor: "APT41 Group", sev: "critical", code: "VT-POWER-26" },
  { title: "LockBit 4.0 Sweeping Active Directory", target: "Enterprise Domain Controllers", threatActor: "LockBit Affiliates", sev: "critical", code: "LB-DC-SWEEP" },
  { title: "Ransomware sweep utilizing VPN zero-day", target: "Global VPN Concentrators", threatActor: "FIN8 Ransom Crew", sev: "high", code: "FIN8-VPN-X" },
  { title: "Sandworm deploying destructive CaddyWiper", target: "Municipal Water Systems", threatActor: "Sandworm (APT28)", sev: "critical", code: "SW-WIPER-26" },
  { title: "Lazarus spearphishing targeting blockchain", target: "Web3 Decentralized Nodes", threatActor: "Lazarus Group", sev: "high", code: "LZ-CRYPTO-PHISH" },
  { title: "Phishing campaign deploying AgentTesla v4", target: "Defense Contractors Logistics", threatActor: "TA505 Broker", sev: "medium", code: "TA505-TESLA" }
];

const RECENT_CVES = [
  { id: "CVE-2026-28103", desc: "Remote Code Execution (RCE) in Kubernetes API routing gateway.", score: "9.8 CRITICAL", style: "score-c" },
  { id: "CVE-2025-49210", desc: "Active Directory Privilege Escalation bypass via Kerberos tickets.", score: "8.8 HIGH", style: "score-h" },
  { id: "CVE-2026-11728", desc: "SSRF bypass in Citrix NetScaler load balancer configurations.", score: "9.6 CRITICAL", style: "score-c" },
  { id: "CVE-2025-30018", desc: "Buffer overflow vulnerability inside OpenSSH packet parsing handlers.", score: "8.1 HIGH", style: "score-h" },
  { id: "CVE-2026-00431", desc: "Pre-Auth RCE bypass found inside Outlook Web Access servers.", score: "9.8 CRITICAL", style: "score-c" },
  { id: "CVE-2025-99281", desc: "Authenticated Heap Spray overflow inside Ivanti secure routers.", score: "7.8 HIGH", style: "score-h" }
];

let campaignFeed = [...CRITICAL_CAMPAIGNS].slice(0, 4);
let cveFeed = [...RECENT_CVES].slice(0, 4);

function initThreatIntel() {
  renderThreatFeeds();
  
  // Refresh simulation loop every 20 seconds
  setInterval(() => {
    simulateNewThreatEvent();
  }, 20000);
}

function renderThreatFeeds() {
  // Active Campaign Feed
  const feedCampaigns = document.getElementById('feed-attacks');
  if (feedCampaigns) {
    feedCampaigns.innerHTML = "";
    document.getElementById('attack-count').innerText = `${campaignFeed.length} Campaigns`;
    
    campaignFeed.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="threat-icon ${item.sev}">${item.sev === 'critical' ? 'CRIT' : 'HIGH'}</div>
        <div class="threat-body">
          <div class="threat-title">${item.title}</div>
          <div class="threat-meta">
            <span><strong>Target:</strong> ${item.target}</span>
            <span><strong>Actor:</strong> ${item.threatActor}</span>
            <span style="font-family:'Share Tech Mono', monospace; color:var(--cyan);">${item.code}</span>
          </div>
        </div>
      `;
      feedCampaigns.appendChild(li);
    });
    
    const now = new Date().toLocaleTimeString();
    document.getElementById('attacks-updated').innerText = `LAST DIAGNOSTIC UPDATE: ${now}`;
  }

  // CVE Feed
  const feedCves = document.getElementById('feed-cves');
  if (feedCves) {
    feedCves.innerHTML = "";
    document.getElementById('cve-count').innerText = `${cveFeed.length} Active`;
    
    cveFeed.forEach(item => {
      const row = document.createElement('div');
      row.className = "cve-row";
      row.innerHTML = `
        <div class="cve-id">${item.id}</div>
        <div class="cve-desc">${item.desc}</div>
        <div class="cve-score ${item.style}">${item.score}</div>
      `;
      feedCves.appendChild(row);
    });
    
    const now = new Date().toLocaleTimeString();
    document.getElementById('cves-updated').innerText = `LAST DATABASE SYNC: ${now}`;
  }
}

function simulateNewThreatEvent() {
  // Push a new campaign randomly
  const randCampaign = CRITICAL_CAMPAIGNS[Math.floor(Math.random() * CRITICAL_CAMPAIGNS.length)];
  // Add a unique identifier code suffix
  const clone = { ...randCampaign, code: `${randCampaign.code}-${Math.floor(Math.random()*900 + 100)}` };
  
  campaignFeed.unshift(clone);
  if (campaignFeed.length > 5) campaignFeed.pop(); // Cap feed list

  // Generate new simulated CVE
  const year = Math.random() > 0.5 ? '2026' : '2025';
  const cveId = `CVE-${year}-${Math.floor(Math.random()*89999 + 10000)}`;
  const descriptions = [
    "Unauthenticated RCE in Apache Struts configuration parsers.",
    "Bypass mitigation found inside Windows Kernel Virtual Memory manager.",
    "Arbitrary File Read flaw detected inside Apache Tomcat hosting blocks.",
    "Authentication Bypass vulnerabilities affecting F5 BIG-IP systems.",
    "Zero-day privilege escalation sweep in Linux sudo parser libraries."
  ];
  const desc = descriptions[Math.floor(Math.random() * descriptions.length)];
  const isCritical = Math.random() > 0.4;
  const score = isCritical ? `${(Math.random() * 0.8 + 9.2).toFixed(1)} CRITICAL` : `${(Math.random() * 1.4 + 7.5).toFixed(1)} HIGH`;
  const style = isCritical ? 'score-c' : 'score-h';
  
  cveFeed.unshift({ id: cveId, desc, score, style });
  if (cveFeed.length > 5) cveFeed.pop();

  renderThreatFeeds();
  
  // Trigger particle burst on map if map exists
  if (window.triggerMapAttack) {
    window.triggerMapAttack();
  }
}

function simulateNewCampaign() {
  simulateNewThreatEvent();
}
