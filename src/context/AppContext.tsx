import { createContext, useContext, useState, type ReactNode } from "react";
import type { User, Bid, SponsorshipLot } from "../types";
import { MOCK_USER, MOCK_LOTS, MOCK_BIDS } from "../data/mock";

interface AppContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, _password: string, asAdmin?: boolean) => boolean;
  logout: () => void;
  lots: SponsorshipLot[];
  bids: Bid[];
  placeBid: (lotId: string, amount: number) => { success: boolean; message: string };
  updateLotBid: (lotId: string, amount: number) => void;
  notifications: number;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [lots, setLots] = useState<SponsorshipLot[]>(MOCK_LOTS);
  const [bids, setBids] = useState<Bid[]>(MOCK_BIDS);

  const login = (email: string, _password: string, asAdmin = false) => {
    if (asAdmin || email.includes("admin")) {
      setUser({ ...MOCK_USER, name: "Lahiru Bandara", email: "admin@kuweni3.lk", role: "admin" });
      setIsAdmin(true);
    } else {
      setUser(MOCK_USER);
      setIsAdmin(false);
    }
    return true;
  };

  const logout = () => { setUser(null); setIsAdmin(false); };

  const placeBid = (lotId: string, amount: number): { success: boolean; message: string } => {
    const lot = lots.find(l => l.id === lotId);
    if (!lot) return { success: false, message: "Lot not found." };
    if (amount <= lot.currentBid) return { success: false, message: `Bid must exceed current highest bid of Rs. ${lot.currentBid.toLocaleString()}.` };
    const minNext = lot.currentBid + 100000;
    if (amount < minNext) return { success: false, message: `Minimum bid increment is Rs. 100,000. Next bid must be at least Rs. ${minNext.toLocaleString()}.` };

    const newBid: Bid = {
      id: `BID-${1043 + bids.length}`,
      lotId,
      bidderId: user?.id || "usr-001",
      companyId: user?.companyId || "cmp-001",
      companyMasked: "Company A",
      amount,
      timestamp: new Date().toISOString(),
      status: "winning",
      proxyBid: false,
    };

    setBids(prev => [newBid, ...prev.map(b => b.lotId === lotId ? { ...b, status: "outbid" as const } : b)]);
    setLots(prev => prev.map(l => l.id === lotId ? { ...l, currentBid: amount, bidCount: l.bidCount + 1 } : l));

    return { success: true, message: `Bid of Rs. ${amount.toLocaleString()} placed successfully!` };
  };

  const updateLotBid = (lotId: string, amount: number) => {
    setLots(prev => prev.map(l => l.id === lotId ? { ...l, currentBid: amount } : l));
  };

  return (
    <AppContext.Provider value={{ user, isAdmin, login, logout, lots, bids, placeBid, updateLotBid, notifications: 2 }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
