import { useState } from "react";
import {
  Home,
  Heart,
  Plus,
  Mail,
  Users,
  HelpCircle,
  AlignJustify,
  X,
  ChevronRight,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Copy,
  Eye,
  EyeOff,
  Bell,
  CheckCircle2,
  Menu,
  LucideHeartCrack,
  PlusCircle,
  UsersRound,
} from "lucide-react";
import cardImage from "../app/image/cardnew.png"; //

type View =
  | "home"
  | "account"
  | "kontrolle"
  | "produkte"
  | "posteingang"
  | "kontakt";

const account = {
  name: "Girokonto",
  number: "4970",
  iban: "DE58 5003 1900 0019 0049 70",

  bic: "BBVADEFFXXX",
  holder: "Teresita Karina Di Costa",
  bank: "",
  balance: 0.79,
  available: 0.79,
  overdraft: 2000,
};

const card = {
  name: "Debitkarte",
  number: "9796",
  expiry: "09/28",
  holder: "Teresita Karina Di Costa",
};

const transactions = [
  {
    id: 4,
    type: "debit" as const,
    description: "Einkauf bei MediaMarkt", // Changed from "Netflix & Spotify"
    counterpart: "Streaming-Dienste",
    date: "22. Juli 2025",
    rawDate: "2025-07-22",
    amount: 143, // Kept the same
    category: "Shopping", // Changed from "Unterhaltung"
    icon: "🛍️", // Changed from "🎬"
  },
  {
    id: 3,
    type: "debit" as const,
    description: "Überweisung an Müller", // Changed from "REWE Supermarkt"
    counterpart: "Thomas Müller", // Changed from "REWE Group"
    date: "17. Juli 2025",
    rawDate: "2025-07-17",
    amount: 4350, // Kept the same
    category: "Privat", // Changed from "Einkaufen"
    icon: "TM", // Changed from "🛒"
  },
  {
    id: 2,
    type: "debit" as const,
    description: "Überweisung an Schmidt", // Changed from "Warmmiete Juli"
    counterpart: "Anna Schmidt", // Changed from "Hausverwaltung Berlin"
    date: "16. Juli 2025",
    rawDate: "2025-07-16",
    amount: 3500, // Kept the same
    category: "Privat", // Changed from "Wohnen"
    icon: "AS", // Changed from "🏠"
  },
  {
    id: 1,
    type: "credit" as const,
    description: "Gehaltseingang",
    counterpart: "Mustermann GmbH",
    date: "15. Juli 2025",
    rawDate: "2025-07-16",
    amount: 8000,
    category: "Einkommen",
    icon: "💼",
  },
];

const formatEuro = (amount: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
    amount,
  );

function NavBar({ active, onNav }: { active: View; onNav: (v: View) => void }) {
  const items: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Übersicht", icon: <Home size={22} /> },
    {
      id: "kontrolle",
      label: "Kontrolle",
      icon: <LucideHeartCrack size={22} />,
    },
    { id: "produkte", label: "Produkte", icon: <PlusCircle size={22} /> },
    { id: "posteingang", label: "Posteingang", icon: <Mail size={22} /> },
    { id: "kontakt", label: "Kontakt", icon: <UsersRound size={22} /> },
  ];

  return (
    <nav
      style={{ fontFamily: "Inter, sans-serif" }}
      className="fixed mx-3 mb-2 rounded-2xl bg-white bottom-0 left-0 right-0 z-50 border-t border-gray-200 flex items-stretch"
    >
      {items.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 transition-colors"
            style={{ color: isActive ? "#e8edf5" : "#8a9abc" }}
          >
            <span
              className="flex items-center justify-center w-10 h-10 rounded-full transition-colors"
              style={{ background: isActive ? "#003087" : "transparent" }}
            >
              {item.icon}
            </span>
            <span
              className="text-[10px] font-medium leading-tight"
              style={{ color: isActive ? "#003087" : "#8a9abc" }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function TransactionItem({ tx }: { tx: (typeof transactions)[0] }) {
  const isCredit = tx.type === "credit";
  return (
    <div className="flex items-center gap-3 py-3.5 border-b border-gray-100 last:border-0">
      <div
        className="w-10 h-10 font-semibold rounded-full flex items-center justify-center text-base flex-shrink-0"
        style={{ background: isCredit ? "#e6f4ea" : "#fce8ec" }}
      >
        {tx.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font- text-gray-900 truncate">{tx.description}</p>
        <p className="text-xs text-gray-400 mt-0.5">{tx.date}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p
          className="text-sm"
          // style={{ color: isCredit ? "#1a7f4b" : "#d32f4f" }}
        >
          {isCredit ? "+" : "-"}
          {formatEuro(tx.amount)}
        </p>
        <div className="flex items-center justify-end gap-0.5 mt-0.5">
          {isCredit ? (
            <ArrowDownLeft size={11} className="text-green-600" />
          ) : (
            <ArrowUpRight size={11} className="text-red-500" />
          )}
          <span className="text-[10px] text-gray-400">{tx.category}</span>
        </div>
      </div>
    </div>
  );
}

function AccountDetailView({ onBack }: { onBack: () => void }) {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [ibanCopied, setIbanCopied] = useState(false);

  const copyIban = () => {
    navigator.clipboard
      .writeText(account.iban.replace(/\s/g, ""))
      .catch(() => {});
    setIbanCopied(true);
    setTimeout(() => setIbanCopied(false), 2000);
  };

  const totalDebit = transactions
    .filter((t) => t.type === "debit")
    .reduce((s, t) => s + t.amount, 0);
  const totalCredit = transactions
    .filter((t) => t.type === "credit")
    .reduce((s, t) => s + t.amount, 0);

  return (
    <div
      className="flex flex-col min-h-full"
      style={{ fontFamily: "Inter, sans-serif", background: "#f0f2f5" }}
    >
      {/* Header */}

      {/* Content */}
      <div className="flex-1 px-4 py-4 pb-24 space-y-4">
        {/* Account info card */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Kontoinformationen
            </p>
          </div>
          <div className="divide-y divide-gray-50">
            <div className="px-4 py-3.5 flex justify-between items-center">
              <span className="text-sm text-gray-500">Kontoinhaber</span>
              <span className="text-sm font-semibold text-gray-900">
                {account.holder}
              </span>
            </div>
            {/* <div className="px-4 py-3.5 flex justify-between items-center">
              <span className="text-sm text-gray-500">Bank</span>
              <span className="text-sm font-semibold text-gray-900">
                {account.bank}
              </span>
            </div> */}
            <div className="px-4 py-3.5 flex justify-between items-start">
              <span className="text-sm text-gray-500">IBAN</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-900 font-mono">
                  {account.iban}
                </span>
                <button
                  onClick={copyIban}
                  className="p-1 rounded-md transition-colors"
                  style={{ color: ibanCopied ? "#1a7f4b" : "#003087" }}
                >
                  {ibanCopied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
            <div className="px-4 py-3.5 flex justify-between items-center">
              <span className="text-sm text-gray-500">BIC</span>
              <span className="text-sm font-semibold text-gray-900 font-mono">
                {account.bic}
              </span>
            </div>
          </div>
        </div>

        {/* Monthly summary */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Juli 2025 – Zusammenfassung
            </p>
          </div>
          <div className="flex divide-x divide-gray-100">
            <div className="flex-1 px-4 py-4">
              <div className="flex items-center gap-1.5 mb-1">
                <ArrowDownLeft size={14} className="text-green-600" />
                <span className="text-xs text-gray-500">Einnahmen</span>
              </div>
              <p className="text-lg">+{formatEuro(totalCredit)}</p>
            </div>
            <div className="flex-1 px-4 py-4">
              <div className="flex items-center gap-1.5 mb-1">
                <ArrowUpRight size={14} className="text-red-500" />
                <span className="text-xs text-gray-500">Ausgaben</span>
              </div>
              <p className="text-lg">-{formatEuro(totalDebit)}</p>
            </div>
          </div>
        </div>

        {/* Transaction history */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Letzte Umsätze
            </p>
            <span
              className="text-xs font-semibold"
              style={{ color: "#003087" }}
            >
              {transactions.length} Buchungen
            </span>
          </div>
          <div className="px-4">
            {transactions.map((tx) => (
              <TransactionItem key={tx.id} tx={tx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeView({ onAccountClick }: { onAccountClick: () => void }) {
  const [bannerVisible, setBannerVisible] = useState(true);
  const totalDebit = transactions
    .filter((t) => t.type === "debit")
    .reduce((s, t) => s + t.amount, 0);
  const totalCredit = transactions
    .filter((t) => t.type === "credit")
    .reduce((s, t) => s + t.amount, 0);
  const savings = totalCredit - totalDebit;

  return (
    <div
      style={{ fontFamily: "Inter, sans-serif", background: "#f0f2f5" }}
      className="flex flex-col min-h-full"
    >
      {/* Header */}
      <div
        className="fixed top-0 left-0 py-3 right-0 z-50 w-full  px-5 pt-4 pb- flex items-start justify-between"
        style={{ fontFamily: "Inter, sans-serif", background: "#f0f2f5" }}
      >
        <div className="flex flex-col items-center gap-0.5">
          <div className="w-9 h-9 rounded-full bg-white/50 flex items-center justify-center">
            <span className="text-base">
              <Eye />
            </span>
          </div>
          <span className="text-[10px] text-gray-500 font-medium">Normal</span>
        </div>
        <div>
          <p className="text-sm font-bold pt-3 text-gray-900 text-center">
            Hallo, Teresita Karina!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-9 h-9 rounded-full bg-white/50 flex items-center justify-center">
              <HelpCircle size={18} color="#5a6a8a" />
            </div>
            <span className="text-[10px] text-gray-500 font-medium">Hilfe</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-9 h-9 rounded-full bg-white/50 flex items-center justify-center">
              <Menu size={18} color="#5a6a8a" />
            </div>
            <span className="text-[10px] text-gray-500 font-medium">Menü</span>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-24 pt-20">
        {/* Promotional Banner */}
        {bannerVisible && (
          <div
            className="mx-4 mt-4 rounded-2xl overflow-hidden"
            style={{ background: "#003087" }}
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-">
                  <div className="-mt-1.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <CreditCard size={16} color="white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm leading-snug">
                      Kontowechsel leicht gemacht
                    </p>
                    <p className="text-blue-200 text-xs mt-1 leading-relaxed">
                      Gehalt & Lastschriften automatisch übertragen.
                    </p>
                    <button
                      className="mt-2 text-xs font-semibold"
                      style={{ color: "#5bc8f5" }}
                    >
                      Mehr erfahren
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setBannerVisible(false)}
                  className="-mt-1.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <X size={12} color="white" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Konten Section */}
        <div className="px-4 mt-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">Konten</h2>
            <span className="text-sm text-gray-600">
              {formatEuro(account.balance)}
            </span>
          </div>
          <button
            onClick={onAccountClick}
            className="w-full bg-white/80 rounded-2xl p-4 flex items-center justify-between active:opacity-80 transition-opacity"
          >
            <div className="text-left">
              <p className="text-sm font-medium" style={{ color: "#003087" }}>
                {account.name} *{account.number}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">• {account.number}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-base font-medium text-gray-900">
                  {formatEuro(account.balance)}
                </p>
                <p className="text-xs text-gray-400">Verfügbar</p>
              </div>
              <ChevronRight size={16} color="#9ca3af" />
            </div>
          </button>
        </div>

        {/* Karten Section */}
        <div className="px-4 mt-5">
          <h2 className="text-lg font-medium text-gray-900 mb-3">Karten</h2>
          <div className="bg-white/80 rounded-2xl p-4">
            <p
              className="text-sm font-medium mb-3"
              style={{ color: "#003087" }}
            >
              Debitkarte *{card.number}
            </p>
            <div className="flex items-center gap-3">
              <img
                src={cardImage}
                alt="Card"
                className="w-16 h-10 rounded-lg object-cover flex-shrink-0"
              />
              <span className="text-sm text-gray-400 pb-2 -ml-3">
                <span className="text-black/60"> •</span> {card.number}
              </span>
            </div>
          </div>
        </div>

        {/* Finanzkontrolle */}
        <div className="px-4 mt-5">
          <h2 className="text-lg text-gray-900 mb-3">Finanzkontrolle</h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white rounded-2xl p-3">
              <p className="text-base text-gray-900 leading-tight">
                {formatEuro(totalDebit)}
              </p>
              <p
                className="text-xs font-semibold mt-1"
                style={{ color: "#003087" }}
              >
                Ausgaben
              </p>
            </div>
            <div className="bg-white rounded-2xl p-3">
              <p className="text-base  text-gray-900 leading-tight">
                {formatEuro(totalCredit)}
              </p>
              <p
                className="text-xs font-semibold mt-1"
                style={{ color: "#003087" }}
              >
                Einnahmen
              </p>
            </div>
            <div className="bg-white rounded-2xl p-3">
              <p className="text-base leading-tight">{formatEuro(savings)}</p>
              <p
                className="text-xs font-semibold mt-1"
                style={{ color: "#003087" }}
              >
                Ersparnisse
              </p>
            </div>
          </div>
        </div>

        {/* Letzte Umsätze */}
        <div className="px-4 mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg text-gray-900">Letzte Umsätze</h2>
            <button
              className="text-xs font-semibold"
              style={{ color: "#003087" }}
            >
              Alle ansehen
            </button>
          </div>
          <div className="bg-white rounded-2xl px-4">
            {transactions.map((tx) => (
              <TransactionItem key={tx.id} tx={tx} />
            ))}
          </div>
        </div>

        {/* Empfohlen */}
        <div className="px-4 mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900">Empfohlen</h2>
            <button
              className="text-xs font-semibold"
              style={{ color: "#003087" }}
            >
              Alle ansehen
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                <CreditCard size={16} color="#003087" />
              </div>
              <p className="text-xs font-bold text-gray-900">
                Kreditkarte beantragen
              </p>
              <p className="text-[10px] text-gray-400 mt-1">
                Bis zu 1.500 € Limit
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center mb-2">
                <Plus size={16} color="#1a7f4b" />
              </div>
              <p className="text-xs font-bold text-gray-900">Tagesgeldkonto</p>
              <p className="text-[10px] text-gray-400 mt-1">2,5% p.a. Zinsen</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderView({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center flex-1 gap-4 pb-24"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: "#e8edf5" }}
      >
        <span style={{ color: "#003087" }}>{icon}</span>
      </div>
      <div className="text-center">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-400 mt-1">
          Dieser Bereich ist in Kürze verfügbar.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState<View>("home");
  const [showAccount, setShowAccount] = useState(false);

  const handleNav = (view: View) => {
    setActiveNav(view);
    setShowAccount(false);
  };

  return (
    <div
      className="relative flex flex-col min-h-screen max-w-[430px] mx-auto overflow-hidden"
      style={{ background: "#f0f2f5", fontFamily: "Inter, sans-serif" }}
    >
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {showAccount ? (
          <div className="flex-1 overflow-y-auto">
            <AccountDetailView onBack={() => setShowAccount(false)} />
          </div>
        ) : activeNav === "home" ? (
          <div className="flex-1 overflow-y-auto">
            <HomeView onAccountClick={() => setShowAccount(true)} />
          </div>
        ) : activeNav === "kontrolle" ? (
          <div className="flex-1 flex flex-col pt-12">
            <PlaceholderView
              title="Finanzkontrolle"
              icon={<Heart size={28} />}
            />
          </div>
        ) : activeNav === "produkte" ? (
          <div className="flex-1 flex flex-col pt-12">
            <PlaceholderView title="Produkte" icon={<Plus size={28} />} />
          </div>
        ) : activeNav === "posteingang" ? (
          <div className="flex-1 flex flex-col pt-12">
            <PlaceholderView title="Posteingang" icon={<Mail size={28} />} />
          </div>
        ) : (
          <div className="flex-1 flex flex-col pt-12">
            <PlaceholderView title="Kontakt" icon={<Users size={28} />} />
          </div>
        )}
      </div>

      {/* Bottom nav always at the bottom */}

      <NavBar active={showAccount ? "home" : activeNav} onNav={handleNav} />
    </div>
  );
}
