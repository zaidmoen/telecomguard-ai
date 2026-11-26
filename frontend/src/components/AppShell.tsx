import { useEffect, useState } from "react";
import {
  Activity, ArrowUpRight, BrainCircuit, ChartNoAxesCombined,
  ChevronDown, CircleHelp, Database, LayoutDashboard, Menu,
  RadioTower, ScanLine, ShieldCheck, WifiOff, X,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useWorkspace } from "../state/WorkspaceContext";
import { StateLabel } from "./UI";

const navigation = [
  { name: "Overview", path: "/", icon: LayoutDashboard },
  { name: "Datasets", path: "/datasets", icon: Database },
  { name: "Training Studio", path: "/training", icon: BrainCircuit },
  { name: "Model Comparison", path: "/comparison", icon: ChartNoAxesCombined },
  { name: "Prediction Lab", path: "/predictions", icon: ScanLine },
] as const;

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { apiState, selectedDataset, refresh } = useWorkspace();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const section = navigation.find((item) => item.path === location.pathname)?.name || "Overview";

  return (
    <div className="app-shell">
      {mobileOpen && (
        <button className="mobile-backdrop" onClick={() => setMobileOpen(false)}
          aria-label="Close navigation" />
      )}

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <NavLink to="/" className="brand" aria-label="TelecomGuard AI home">
            <div className="brand-symbol"><RadioTower size={23} strokeWidth={2.2}/></div>
            <div className="brand-type">
              <strong>Telecom<span>Guard</span></strong>
              <small>AI INTELLIGENCE</small>
            </div>
          </NavLink>
          <button className="mobile-close icon-button" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X size={19}/>
          </button>
        </div>

        <div className="workspace-switcher" aria-label="Current workspace">
          <div className="workspace-icon"><Activity size={18}/></div>
          <div className="workspace-meta">
            <strong>ML Workspace</strong>
            <span>Academic project</span>
          </div>
          <ChevronDown size={15} className="muted-icon"/>
        </div>

        <div className="sidebar-label">WORKSPACE</div>
        <nav className="nav-list" aria-label="Primary navigation">
          {navigation.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) => `nav-item ${isActive ? "nav-active" : ""}`}
            >
              <Icon size={19} strokeWidth={1.9}/>
              <span>{name}</span>
              {path === "/training" && <span className="nav-mini">05</span>}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-assist">
            <div className="sidebar-assist-icon"><ShieldCheck size={19}/></div>
            <strong>Built for explainability</strong>
            <p>Five classifiers. One transparent evaluation workflow.</p>
            <a href="https://github.com/zaidmoen/telecomguard-ai"
               target="_blank" rel="noreferrer">
              View repository <ArrowUpRight size={14}/>
            </a>
          </div>
          <div className="sidebar-footer">
            <span className="avatar-mark">TG</span>
            <div><strong>Team workspace</strong><small>Foundation phase</small></div>
            <CircleHelp size={17} className="muted-icon" aria-hidden="true"/>
          </div>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-menu icon-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation">
              <Menu size={22}/>
            </button>
            <div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-divider">/</span><strong>{section}</strong></div>
          </div>
          <div className="topbar-right">
            {selectedDataset && <div className="active-context" title={selectedDataset.name}>
              <Database size={14}/><span>{selectedDataset.name}</span>
            </div>}
            <button className="connection-button" onClick={refresh}
              aria-label="Refresh backend connection" title="Refresh backend connection">
              {apiState === "error" ? <WifiOff size={15}/> : <span className="connection-indicator"/>}
              <StateLabel state={apiState} readyLabel="API online"/>
            </button>
            <div className="topbar-avatar">TG</div>
          </div>
        </header>

        <main className="main-content" id="main-content">
          {children}
        </main>

        <footer className="main-footer">
          <span>© TelecomGuard AI · University ML Project</span>
          <span>Frontend foundation <span className="footer-divider">·</span> Model execution not yet enabled</span>
        </footer>
      </div>
    </div>
  );
}
