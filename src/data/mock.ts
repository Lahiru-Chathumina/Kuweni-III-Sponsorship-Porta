import type { SponsorshipLot, Bid, Company, AuditLog, Document, Contract, User, Notification } from "../types";

export const MOCK_USER: User = {
  id: "usr-001",
  name: "Priya Jayawardena",
  email: "priya@techcorp.lk",
  companyId: "cmp-001",
  role: "buyer",
  mfaEnabled: true,
  verified: true,
};

export const MOCK_ADMIN: User = {
  id: "usr-admin",
  name: "Ruwan Perera",
  email: "admin@kuweni3.lk",
  companyId: "cmp-admin",
  role: "admin",
  mfaEnabled: true,
  verified: true,
};

export const MOCK_COMPANIES: Company[] = [
  { id: "cmp-001", name: "TechCorp Lanka Pvt Ltd", email: "bids@techcorp.lk", domain: "techcorp.lk", registrationNumber: "PV/00123/2019", contactPerson: "Priya Jayawardena", phone: "+94 77 123 4567", status: "verified", submittedAt: "2026-08-10", documents: ["reg_doc.pdf"] },
  { id: "cmp-002", name: "Sunrise Holdings Ltd", email: "procurement@sunrise.lk", domain: "sunrise.lk", registrationNumber: "PV/00456/2020", contactPerson: "Chaminda Rathnayake", phone: "+94 71 987 6543", status: "verified", submittedAt: "2026-08-12", documents: ["reg_doc.pdf"] },
  { id: "cmp-003", name: "Ceylon Digital Media", email: "bids@ceylondigital.lk", domain: "ceylondigital.lk", registrationNumber: "PV/00789/2021", contactPerson: "Dilini Fernando", phone: "+94 76 555 0011", status: "pending", submittedAt: "2026-08-28", documents: ["reg_doc.pdf"] },
  { id: "cmp-004", name: "Apex Beverages PLC", email: "sponsorships@apex.lk", domain: "apex.lk", registrationNumber: "PV/01122/2018", contactPerson: "Nimal Wickramasinghe", phone: "+94 77 444 3322", status: "pending", submittedAt: "2026-08-30", documents: ["reg_doc.pdf"] },
  { id: "cmp-005", name: "Ridgeline Capital", email: "events@ridgeline.lk", domain: "ridgeline.lk", registrationNumber: "PV/01333/2017", contactPerson: "Samantha De Silva", phone: "+94 71 222 8899", status: "rejected", submittedAt: "2026-08-05", documents: [] },
];

const NOW = new Date("2026-09-03T10:30:00");
const endDate1 = new Date(NOW.getTime() + 29 * 24 * 60 * 60 * 1000 + 14 * 3600 * 1000 + 32 * 60 * 1000 + 18 * 1000).toISOString();
const endDate2 = new Date(NOW.getTime() + 22 * 24 * 60 * 60 * 1000).toISOString();
const endDate3 = new Date(NOW.getTime() + 15 * 24 * 60 * 60 * 1000).toISOString();
const endDate4 = new Date(NOW.getTime() + 18 * 24 * 60 * 60 * 1000).toISOString();
const endDate5 = new Date(NOW.getTime() + 25 * 24 * 60 * 60 * 1000).toISOString();
const endDate6 = new Date(NOW.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString();

export const MOCK_LOTS: SponsorshipLot[] = [
  {
    id: "lot-001",
    name: "Main Partner",
    category: "Title Sponsor",
    description: "Exclusive title sponsorship of the Kuweni III event with maximum brand visibility across all event touchpoints, including naming rights, stage branding, and priority positioning in all media assets.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop&auto=format",
    reservePrice: 10000000,
    startingBid: 5000000,
    currentBid: 12500000,
    bidCount: 14,
    participantCount: 5,
    auctionStart: "2026-08-15T09:00:00",
    auctionEnd: endDate1,
    status: "active",
    benefits: [
      "Exclusive 'Presented by' naming rights across all Kuweni III branding",
      "Premium stage branding — center stage backdrop, podium branding",
      "Top billing on all print, digital, and broadcast media",
      "VIP hospitality suite for 20 guests",
      "2-minute brand video played at opening and closing ceremonies",
      "Dedicated press conference opportunity",
      "First right of refusal for Kuweni IV",
    ],
    deliverables: [
      "Logo placement: all event materials (30-day lead-up)",
      "Social media mentions: minimum 50 posts across official channels",
      "Broadcast integration: 4x mentions per broadcast hour",
      "On-site activation zone: 200 sqm dedicated area",
      "Post-event analytics report",
    ],
  },
  {
    id: "lot-002",
    name: "Official Technology Partner",
    category: "Technology",
    description: "Strategic technology partnership providing official digital infrastructure branding, app integration, and tech innovation showcase opportunities.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop&auto=format",
    reservePrice: 6000000,
    startingBid: 2500000,
    currentBid: 7200000,
    bidCount: 9,
    participantCount: 4,
    auctionStart: "2026-08-15T09:00:00",
    auctionEnd: endDate2,
    status: "active",
    benefits: [
      "Official Technology Partner designation",
      "Product demo zone within venue",
      "App integration and co-branding on official event app",
      "Logo on all digital screens and LED panels",
      "Tech Innovation Stage naming rights",
      "10 VIP tickets with hospitality",
    ],
    deliverables: [
      "Logo placement: digital first — website, app, social media",
      "30-second tech showcase video in main arena",
      "Integration of tech product in at least one event activation",
      "Post-event technology impact report",
    ],
  },
  {
    id: "lot-003",
    name: "Premium Experience Partner",
    category: "Experience",
    description: "Curate and brand the exclusive VIP experience zones, hospitality suites, and premium guest journey throughout the Kuweni III event.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=450&fit=crop&auto=format",
    reservePrice: 4500000,
    startingBid: 2000000,
    currentBid: 5800000,
    bidCount: 7,
    participantCount: 3,
    auctionStart: "2026-08-15T09:00:00",
    auctionEnd: endDate3,
    status: "active",
    benefits: [
      "Naming rights for all VIP and VVIP zones",
      "Branded hospitality suite for 30 guests",
      "Exclusive product/service experience activations",
      "Co-branded gifting and premium guestpacks",
      "Category exclusivity — no competing brand",
    ],
    deliverables: [
      "VIP lounge branding: 360° wrap",
      "Branded registration experience",
      "10 sponsored VIP upgrades with brand mention",
      "Post-event experience report with guest feedback",
    ],
  },
  {
    id: "lot-004",
    name: "Digital Media Partner",
    category: "Digital Media",
    description: "Own the digital narrative — livestream integration, social media co-branding, and content partnership across all Kuweni III digital channels.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=450&fit=crop&auto=format",
    reservePrice: 3000000,
    startingBid: 1500000,
    currentBid: 4100000,
    bidCount: 11,
    participantCount: 6,
    auctionStart: "2026-08-15T09:00:00",
    auctionEnd: endDate4,
    status: "active",
    benefits: [
      "Co-branding on all livestream overlays and bumpers",
      "Dedicated social media integration across 5 platforms",
      "Content partnership — 10 co-produced digital assets",
      "Digital ad inventory on event website and app",
      "Brand mention in all press releases",
    ],
    deliverables: [
      "Livestream bug: persistent branded overlay",
      "30 co-branded social posts (Stories + Feed)",
      "Email newsletter sponsorship (3 editions)",
      "Digital impressions report",
    ],
  },
  {
    id: "lot-005",
    name: "Official Beverage Partner",
    category: "Beverage",
    description: "Exclusive beverage category rights with on-site product placement, branded bars, and pouring rights across all Kuweni III hospitality areas.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&h=450&fit=crop&auto=format",
    reservePrice: 3500000,
    startingBid: 1800000,
    currentBid: 4650000,
    bidCount: 6,
    participantCount: 4,
    auctionStart: "2026-08-15T09:00:00",
    auctionEnd: endDate5,
    status: "active",
    benefits: [
      "Exclusive beverage category rights — full category lock-out",
      "Official Beverage Partner designation",
      "Product placement at all bars, lounges, and F&B stations",
      "Branded beverage stations with product signage",
      "Sampling rights at public zones",
    ],
    deliverables: [
      "Branded bar tops and back-bar signage",
      "Menu card integration across all venues",
      "20 social media product features",
      "Sampling activation zone: 50 sqm",
    ],
  },
  {
    id: "lot-006",
    name: "Strategic Brand Partner",
    category: "Brand Partner",
    description: "Flexible strategic partnership package with customizable activations, co-branding opportunities, and bespoke deliverables tailored to brand objectives.",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=450&fit=crop&auto=format",
    reservePrice: 2000000,
    startingBid: 1000000,
    currentBid: 2900000,
    bidCount: 8,
    participantCount: 5,
    auctionStart: "2026-08-15T09:00:00",
    auctionEnd: endDate6,
    status: "active",
    benefits: [
      "Co-branding on official event programme",
      "Dedicated brand activation zone: 100 sqm",
      "10 VIP tickets with hospitality access",
      "Feature in event press kit",
      "Social media partnership: 20 co-branded posts",
    ],
    deliverables: [
      "Programme branding: back page full-page advertisement",
      "Branded activation zone with custom fit-out",
      "Announcement across all official event channels",
      "Post-event brand impact assessment",
    ],
  },
];

export const MOCK_BIDS: Bid[] = [
  { id: "BID-1042", lotId: "lot-001", bidderId: "usr-001", companyId: "cmp-001", companyMasked: "Company A", amount: 12500000, timestamp: "2026-09-03T10:32:00", status: "winning", proxyBid: false },
  { id: "BID-1041", lotId: "lot-001", bidderId: "usr-002", companyId: "cmp-002", companyMasked: "Company B", amount: 12000000, timestamp: "2026-09-03T10:27:00", status: "outbid", proxyBid: false },
  { id: "BID-1040", lotId: "lot-001", bidderId: "usr-001", companyId: "cmp-001", companyMasked: "Company A", amount: 11500000, timestamp: "2026-09-03T09:55:00", status: "outbid", proxyBid: true },
  { id: "BID-1039", lotId: "lot-001", bidderId: "usr-003", companyId: "cmp-003", companyMasked: "Company C", amount: 11000000, timestamp: "2026-09-03T09:41:00", status: "outbid", proxyBid: false },
  { id: "BID-1038", lotId: "lot-001", bidderId: "usr-002", companyId: "cmp-002", companyMasked: "Company B", amount: 10500000, timestamp: "2026-09-03T09:22:00", status: "outbid", proxyBid: false },
  { id: "BID-1037", lotId: "lot-001", bidderId: "usr-001", companyId: "cmp-001", companyMasked: "Company A", amount: 10000000, timestamp: "2026-09-03T08:58:00", status: "outbid", proxyBid: false },
  { id: "BID-1036", lotId: "lot-001", bidderId: "usr-004", companyId: "cmp-004", companyMasked: "Company D", amount: 9500000, timestamp: "2026-09-02T16:44:00", status: "outbid", proxyBid: false },
  { id: "BID-1035", lotId: "lot-001", bidderId: "usr-003", companyId: "cmp-003", companyMasked: "Company C", amount: 9000000, timestamp: "2026-09-02T15:30:00", status: "outbid", proxyBid: false },
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  { id: "log-001", timestamp: "2026-09-03T10:32:14", userId: "usr-001", company: "TechCorp Lanka", action: "Bid Submitted — LOT-001 — Rs. 12,500,000", ipAddress: "203.94.xx.xx", status: "success" },
  { id: "log-002", timestamp: "2026-09-03T10:30:55", userId: "usr-001", company: "TechCorp Lanka", action: "Document Viewed — Lot 001 Pitch Deck", ipAddress: "203.94.xx.xx", status: "success" },
  { id: "log-003", timestamp: "2026-09-03T10:28:40", userId: "usr-002", company: "Sunrise Holdings", action: "Bid Submitted — LOT-001 — Rs. 12,000,000", ipAddress: "117.253.xx.xx", status: "success" },
  { id: "log-004", timestamp: "2026-09-03T10:22:11", userId: "usr-001", company: "TechCorp Lanka", action: "Proxy Bid Activated — LOT-001 — Max Rs. 15,000,000", ipAddress: "203.94.xx.xx", status: "success" },
  { id: "log-005", timestamp: "2026-09-03T09:55:00", userId: "SYSTEM", company: "System", action: "Proxy Bid Executed — LOT-001 — Rs. 11,500,000", ipAddress: "internal", status: "success" },
  { id: "log-006", timestamp: "2026-09-03T09:41:33", userId: "usr-003", company: "Ceylon Digital Media", action: "Bid Submitted — LOT-001 — Rs. 11,000,000", ipAddress: "112.135.xx.xx", status: "success" },
  { id: "log-007", timestamp: "2026-09-03T09:10:00", userId: "usr-003", company: "Ceylon Digital Media", action: "Document Downloaded — Lot 001 Financial Model", ipAddress: "112.135.xx.xx", status: "warning" },
  { id: "log-008", timestamp: "2026-09-02T16:44:22", userId: "usr-004", company: "Apex Beverages", action: "Bid Submitted — LOT-001 — Rs. 9,500,000", ipAddress: "175.101.xx.xx", status: "success" },
  { id: "log-009", timestamp: "2026-09-02T14:20:00", userId: "usr-005", company: "Ridgeline Capital", action: "Login Attempt — MFA Failed", ipAddress: "198.51.xx.xx", status: "failed" },
  { id: "log-010", timestamp: "2026-09-02T11:05:44", userId: "admin", company: "System Admin", action: "Company Verified — Ceylon Digital Media", ipAddress: "10.0.xx.xx", status: "success" },
  { id: "log-011", timestamp: "2026-09-01T17:30:00", userId: "admin", company: "System Admin", action: "Auction Started — LOT-001 Main Partner", ipAddress: "10.0.xx.xx", status: "success" },
  { id: "log-012", timestamp: "2026-09-01T16:45:00", userId: "admin", company: "System Admin", action: "Role Updated — usr-001 — Verified Buyer", ipAddress: "10.0.xx.xx", status: "success" },
];

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: "doc-001", lotId: "lot-001", name: "Kuweni III — Main Partner Pitch Deck", type: "pitch_deck", size: "8.4 MB", confidential: true,
    accessHistory: [
      { user: "Priya Jayawardena", company: "TechCorp Lanka", timestamp: "2026-09-03T10:30:55" },
      { user: "Chaminda Rathnayake", company: "Sunrise Holdings", timestamp: "2026-09-02T14:15:00" },
    ],
  },
  {
    id: "doc-002", lotId: "lot-001", name: "Kuweni III — Financial Model & ROI Projections", type: "financial_model", size: "3.2 MB", confidential: true,
    accessHistory: [
      { user: "Dilini Fernando", company: "Ceylon Digital Media", timestamp: "2026-09-03T09:10:00" },
    ],
  },
  {
    id: "doc-003", lotId: "lot-001", name: "Kuweni III — Documentary Pre-Cut (5 min)", type: "documentary", size: "420 MB", confidential: true,
    accessHistory: [],
  },
  {
    id: "doc-004", lotId: "lot-001", name: "Kuweni III — Sponsorship Proposal v2.0", type: "sponsorship_proposal", size: "5.1 MB", confidential: true,
    accessHistory: [
      { user: "Priya Jayawardena", company: "TechCorp Lanka", timestamp: "2026-09-01T11:20:00" },
    ],
  },
  {
    id: "doc-005", lotId: "lot-001", name: "Draft Contract Template — Main Partner", type: "contract", size: "1.8 MB", confidential: true,
    accessHistory: [],
  },
  {
    id: "doc-006", lotId: "lot-001", name: "Kuweni III — Event Highlight Reel", type: "video", size: "280 MB", confidential: false,
    accessHistory: [
      { user: "Priya Jayawardena", company: "TechCorp Lanka", timestamp: "2026-09-02T16:00:00" },
      { user: "Nimal Wickramasinghe", company: "Apex Beverages", timestamp: "2026-09-02T11:30:00" },
    ],
  },
];

export const MOCK_CONTRACT: Contract = {
  id: "ctr-001",
  lotId: "lot-001",
  winnerCompanyId: "cmp-001",
  winningAmount: 12500000,
  status: "term_sheet",
  generatedAt: "2026-10-05T09:00:00",
  milestones: [
    { id: "ms-001", title: "Contract Signing", dueDate: "2026-10-15", status: "pending", amount: 0 },
    { id: "ms-002", title: "Initial Payment (30%)", dueDate: "2026-10-20", status: "pending", amount: 3750000 },
    { id: "ms-003", title: "Event Commencement", dueDate: "2026-11-01", status: "pending", amount: 5000000 },
    { id: "ms-004", title: "Final Payment (Remaining 50%)", dueDate: "2026-11-30", status: "pending", amount: 3750000 },
  ],
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "notif-001", userId: "usr-001", type: "bid_update", title: "Your bid has been outbid", message: "Company B has placed a higher bid of Rs. 12,000,000 on Main Partner.", timestamp: "2026-09-03T10:27:00", read: false },
  { id: "notif-002", userId: "usr-001", type: "proxy_activated", title: "Proxy Bid Activated", message: "Your proxy bid automatically placed Rs. 12,500,000 on Main Partner.", timestamp: "2026-09-03T10:28:05", read: false },
  { id: "notif-003", userId: "usr-001", type: "auction_extended", title: "Auction Extended — Anti-Sniping", message: "A valid bid was received in the final 60 minutes. Auction extended by 15 minutes.", timestamp: "2026-09-03T09:41:33", read: true },
  { id: "notif-004", userId: "usr-001", type: "verification", title: "Account Verified", message: "Your corporate account has been verified. You can now place bids.", timestamp: "2026-09-01T12:00:00", read: true },
];

export const formatCurrency = (amount: number) =>
  `Rs. ${amount.toLocaleString("en-LK")}`;
