import { Metadata } from "next";
import Link from "next/link";
import {
  User as UserIcon,
  MapPin,
  Briefcase,
  ShieldCheck,
  Calendar,
  Hash,
  Globe,
  Award,
  Layers,
  Cpu,
  ArrowLeft,
  ChevronRight,
  Home,
} from "lucide-react";
import { Header } from "@/components/header";
import { ProfileHero } from "@/components/user-details/profile-hero";
import { InfoSection, DetailItem } from "@/components/user-details/info-section";
import { ErrorState } from "@/components/error-state";
import { getUserById } from "@/lib/api";
import { User } from "@/types/user";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const user = await getUserById(resolvedParams.id);
    const fullName = `${user.firstName} ${user.lastName}`;
    return {
      title: `${fullName} (@${user.username}) | User Directory`,
      description: `View detailed user profile for ${fullName}, ${user.company?.title || "Professional"} at ${user.company?.name || "Company"}.`,
    };
  } catch {
    return {
      title: "User Profile | User Directory",
      description: "User details and profile overview.",
    };
  }
}

export default async function UserDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  let user: User | null = null;
  let errorMsg: string | null = null;

  try {
    user = await getUserById(resolvedParams.id);
  } catch (err) {
    errorMsg = err instanceof Error ? err.message : "User could not be found.";
  }

  if (errorMsg || !user) {
    return (
      <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
        <Header />
        <main className="flex-1 mx-auto max-w-4xl px-4 py-16 w-full">
          <ErrorState
            title="User Profile Not Found"
            message={errorMsg || `The requested user ID #${resolvedParams.id} does not exist.`}
          />
          <div className="text-center mt-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> Return to User Directory
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`;

  // 1. Personal Information Items
  const personalItems: DetailItem[] = [
    { label: "First Name", value: user.firstName },
    { label: "Last Name", value: user.lastName },
    { label: "Maiden Name", value: user.maidenName },
    { label: "Username", value: `@${user.username}` },
    { label: "Age / Gender", value: `${user.age} yrs ・ ${user.gender}`, icon: Calendar },
    { label: "Birth Date", value: user.birthDate || "N/A" },
    { label: "Blood Group", value: user.bloodGroup || "N/A" },
    { label: "Eye Color", value: user.eyeColor ? <span className="capitalize">{user.eyeColor}</span> : "N/A" },
    {
      label: "Hair",
      value: user.hair ? `${user.hair.color} (${user.hair.type})` : "N/A",
    },
    { label: "Height & Weight", value: `${user.height || "N/A"} cm ・ ${user.weight || "N/A"} kg` },
  ];

  // 2. Address & Location Items
  const addressItems: DetailItem[] = [
    { label: "Street Address", value: user.address?.address, icon: MapPin },
    { label: "City", value: user.address?.city },
    { label: "State / Code", value: user.address?.state ? `${user.address.state} (${user.address.stateCode || ""})` : "N/A" },
    { label: "Postal Code", value: user.address?.postalCode, icon: Hash },
    { label: "Country", value: user.address?.country || "United States", icon: Globe },
    {
      label: "Geo Coordinates",
      value: user.address?.coordinates ? (
        <span className="font-mono text-xs bg-muted px-2 py-1 rounded-md border border-border/60">
          Lat: {user.address.coordinates.lat.toFixed(4)}, Lng: {user.address.coordinates.lng.toFixed(4)}
        </span>
      ) : (
        "N/A"
      ),
    },
  ];

  // 3. Professional & Education Items
  const professionalItems: DetailItem[] = [
    { label: "Company Name", value: user.company?.name, icon: Briefcase },
    { label: "Department", value: user.company?.department, icon: Layers },
    { label: "Job Title", value: user.company?.title, icon: Award },
    { label: "University", value: user.university || "N/A" },
    {
      label: "Office Location",
      value: user.company?.address ? `${user.company.address.address}, ${user.company.address.city}` : "N/A",
    },
  ];

  // 4. Account & Technical Items
  const accountItems: DetailItem[] = [
    { label: "System Role", value: <span className="capitalize font-bold text-primary">{user.role || "User"}</span>, icon: ShieldCheck },
    { label: "IP Address", value: <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{user.ip || "N/A"}</code>, icon: Cpu },
    { label: "MAC Address", value: <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{user.macAddress || "N/A"}</code> },
    {
      label: "Crypto Wallet",
      value: user.crypto ? (
        <div className="space-y-0.5 text-xs font-mono bg-muted p-2 rounded-lg border border-border/60">
          <p className="font-bold text-primary">{user.crypto.coin} Wallet</p>
          <p className="truncate text-muted-foreground">{user.crypto.wallet}</p>
        </div>
      ) : (
        "N/A"
      ),
    },
    { label: "User Agent", value: <span className="text-xs font-mono truncate block max-w-full text-muted-foreground">{user.userAgent || "N/A"}</span> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased selection:bg-primary selection:text-primary-foreground">
      <Header />

      <main className="flex-1 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
              <Home className="h-3.5 w-3.5" /> Directory
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
            <span className="hover:text-foreground transition-colors">Users</span>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
            <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-none">{fullName}</span>
          </nav>

          {/* Profile Hero Banner */}
          <ProfileHero user={user} />

          {/* Structured Details Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoSection title="Personal Information" icon={UserIcon} items={personalItems} badgeText="Identity" />
            <InfoSection title="Address & Location" icon={MapPin} items={addressItems} badgeText="Geography" />
            <InfoSection title="Professional & Education" icon={Briefcase} items={professionalItems} badgeText="Career" />
            <InfoSection title="Account & Technical Details" icon={ShieldCheck} items={accountItems} badgeText="Security" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-muted/30 py-6 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} User Directory. All rights reserved.</p>
          <Link href="/" className="font-semibold text-primary hover:underline flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to All Profiles
          </Link>
        </div>
      </footer>
    </div>
  );
}
