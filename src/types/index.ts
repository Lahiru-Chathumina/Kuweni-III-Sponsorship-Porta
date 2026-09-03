export type UserRole = "buyer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  companyId: string;
  role: UserRole;
  mfaEnabled: boolean;
  verified: boolean;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  domain: string;
  registrationNumber: string;
  contactPerson: string;
  phone: string;
  status: "pending" | "verified" | "rejected";
  submittedAt: string;
  documents: string[];
}

export type LotCategory =
  | "Title Sponsor"
  | "Technology"
  | "Experience"
  | "Digital Media"
  | "Beverage"
  | "Brand Partner";

export type AuctionStatus = "upcoming" | "active" | "ended" | "awarded";

export interface SponsorshipLot {
  id: string;
  name: string;
  category: LotCategory;
  description: string;
  image: string;
  reservePrice: number;
  startingBid: number;
  currentBid: number;
  bidCount: number;
  participantCount: number;
  auctionStart: string;
  auctionEnd: string;
  status: AuctionStatus;
  benefits: string[];
  deliverables: string[];
}

export interface Bid {
  id: string;
  lotId: string;
  bidderId: string;
  companyId: string;
  companyMasked: string;
  amount: number;
  timestamp: string;
  status: "valid" | "invalid" | "winning" | "outbid";
  proxyBid: boolean;
}

export interface ProxyBid {
  id: string;
  lotId: string;
  userId: string;
  maxAmount: number;
  increment: number;
  active: boolean;
  currentAmount: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  company: string;
  action: string;
  ipAddress: string;
  status: "success" | "warning" | "failed";
}

export interface Document {
  id: string;
  lotId: string;
  name: string;
  type: "pitch_deck" | "financial_model" | "documentary" | "sponsorship_proposal" | "contract" | "video";
  size: string;
  accessHistory: { user: string; company: string; timestamp: string }[];
  confidential: boolean;
}

export interface Contract {
  id: string;
  lotId: string;
  winnerCompanyId: string;
  winningAmount: number;
  status: "term_sheet" | "legal_review" | "approved" | "signed";
  generatedAt: string;
  milestones: ContractMilestone[];
}

export interface ContractMilestone {
  id: string;
  title: string;
  dueDate: string;
  status: "pending" | "completed";
  amount: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: "bid_update" | "auction_extended" | "proxy_activated" | "winning" | "verification" | "contract";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}
