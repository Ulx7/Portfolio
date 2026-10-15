import React, { useState } from "react";
import { useWindowManager } from "../../../context/WindowManagerContext";
import { XpIcon } from "../XpIcon";
import { Shield, Monitor, HardDrive, Cpu, CheckCircle2, ChevronRight, ChevronDown, Disc } from "lucide-react";

export const SystemPropertiesWindow: React.FC = () => {
  const { closeWindow } = useWindowManager();
  const [activeTab, setActiveTab] = useState<
    "general" | "computer-name" | "hardware" | "advanced" | "restore" | "updates" | "remote"
  >("general");

  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showDeviceManager, setShowDeviceManager] = useState(false);
  const [showEnvVarsModal, setShowEnvVarsModal] = useState(false);

  // Device manager tree expanded states
  const [expandedDevices, setExpandedDevices] = useState<Record<string, boolean>>({
    display: true,
    processors: true,
    sound: false,
    disk: false,
    optical: false,
    floppy: false,
    network: false,
    ports: false,
    input: false,
  });

  const toggleDevice = (key: string) => {
    setExpandedDevices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="system-props-layout">
      {/* Tabs Header */}
      <div className="tabs-header">
        <button
          className={`tab-btn ${activeTab === "general" ? "active" : ""}`}
          onClick={() => setActiveTab("general")}
        >
          General
        </button>
        <button
          className={`tab-btn ${activeTab === "computer-name" ? "active" : ""}`}
          onClick={() => setActiveTab("computer-name")}
        >
          Computer Name
        </button>
        <button
          className={`tab-btn ${activeTab === "hardware" ? "active" : ""}`}
          onClick={() => setActiveTab("hardware")}
        >
          Hardware
        </button>
        <button
          className={`tab-btn ${activeTab === "advanced" ? "active" : ""}`}
          onClick={() => setActiveTab("advanced")}
        >
          Advanced
        </button>
        <button
          className={`tab-btn ${activeTab === "restore" ? "active" : ""}`}
          onClick={() => setActiveTab("restore")}
        >
          System Restore
        </button>
        <button
          className={`tab-btn ${activeTab === "updates" ? "active" : ""}`}
          onClick={() => setActiveTab("updates")}
        >
          Automatic Updates
        </button>
        <button
          className={`tab-btn ${activeTab === "remote" ? "active" : ""}`}
          onClick={() => setActiveTab("remote")}
        >
          Remote
        </button>
      </div>

      {/* Tab Body */}
      <div className="tab-body">
        {/* GENERAL TAB */}
        {activeTab === "general" && (
          <div className="general-tab-content flex flex-col gap-3 text-xs text-gray-900">
            {/* System Info Banner */}
            <div className="flex items-start gap-4 pb-2 border-b border-[#d4d0c8]">
              {/* Windows XP 4-color Flag Graphic */}
              <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded border border-[#1d4ed8] shadow-sm relative overflow-hidden p-1.5">
                <div className="grid grid-cols-2 gap-1 w-full h-full">
                  <div className="bg-[#ef4444] rounded-tl shadow-inner" />
                  <div className="bg-[#22c55e] rounded-tr shadow-inner" />
                  <div className="bg-[#3b82f6] rounded-bl shadow-inner" />
                  <div className="bg-[#eab308] rounded-br shadow-inner" />
                </div>
              </div>

              <div>
                <div className="text-gray-600 font-semibold text-[11px]">System:</div>
                <div className="font-bold text-[13px] text-[#003399] tracking-wide">
                  Microsoft Windows XP
                </div>
                <div className="font-semibold text-gray-800">Professional</div>
                <div className="text-gray-600">Version 2002</div>
                <div className="text-gray-600">Service Pack 3</div>
              </div>
            </div>

            {/* Registered To */}
            <div className="pb-2 border-b border-[#d4d0c8]">
              <div className="text-gray-600 font-semibold mb-0.5">Registered to:</div>
              <div className="pl-4 font-semibold text-gray-900">Ulysse Castello</div>
              <div className="pl-4 text-gray-700">Home Desktop PC</div>
              <div className="pl-4 font-mono text-[11px] text-gray-500">55274-OEM-0145294-22314</div>
            </div>

            {/* Computer & OEM Info */}
            <div className="flex gap-4 items-start pt-1">
              {/* Authentic Vintage OEM Badge */}
              <div className="w-36 flex-shrink-0 flex flex-col items-center p-2 bg-[#f0eee0] border border-[#716f64] rounded text-center shadow-inner">
                <div className="w-12 h-10 border border-[#0055ea] bg-gradient-to-b from-[#0055ea] to-[#1e3a8a] text-white flex flex-col items-center justify-center rounded p-0.5 shadow mb-1">
                  <span className="font-bold text-[9px] tracking-tight">intel</span>
                  <span className="text-[7px] italic font-sans">inside™</span>
                  <span className="font-extrabold text-[8px] tracking-tighter text-yellow-300">pentium 4</span>
                </div>
                <span className="font-bold text-[10px] text-gray-800 tracking-tight">
                  Genuine Intel PC
                </span>
                <span className="text-[9px] text-gray-500 leading-tight">
                  Desktop Series
                </span>
                <button
                  className="xp-dialog-btn w-full mt-2 text-[10px]"
                  onClick={() => setShowSupportModal(true)}
                >
                  Support Information...
                </button>
              </div>

              {/* Genuine Vintage XP Hardware Specs */}
              <div className="flex-1 space-y-0.5 pt-0.5">
                <div className="text-gray-600 font-semibold mb-0.5">Computer:</div>
                <div className="font-semibold text-gray-900">Intel(R)</div>
                <div className="text-gray-800">Pentium(R) 4 CPU 3.00GHz</div>
                <div className="text-gray-800">3.00 GHz, 512 MB of RAM</div>
                <div className="text-gray-500 text-[10px] pt-0.5">Physical Address Extension</div>
              </div>
            </div>
          </div>
        )}

        {/* COMPUTER NAME TAB */}
        {activeTab === "computer-name" && (
          <div className="computer-name-tab-content text-xs text-gray-900 space-y-3">
            <div className="flex items-center gap-3 pb-2 border-b border-[#d4d0c8]">
              <XpIcon name="my-computer" size={32} />
              <p className="text-gray-700 leading-snug">
                Windows uses the following information to identify your computer on the network.
              </p>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-[140px_1fr] items-center gap-2">
                <span className="text-gray-700">Computer description:</span>
                <span className="font-semibold">Home Desktop PC</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] items-center gap-2">
                <span className="text-gray-700">Full computer name:</span>
                <span className="font-mono font-semibold">ULYSSE-PC</span>
              </div>
              <div className="grid grid-cols-[140px_1fr] items-center gap-2">
                <span className="text-gray-700">Workgroup:</span>
                <span className="font-mono font-semibold">MSHOME</span>
              </div>
            </div>

            <fieldset className="xp-groupbox p-3 mt-4">
              <legend>Rename or Domain Setup</legend>
              <p className="text-gray-600 mb-2">
                To rename this computer or join a domain, click Change.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  className="xp-dialog-btn px-3"
                  onClick={() => alert("Network Identification: Computer is configured for MSHOME workgroup.")}
                >
                  Network ID
                </button>
                <button
                  className="xp-dialog-btn px-3"
                  onClick={() => alert("Computer name cannot be modified in guest browser session.")}
                >
                  Change...
                </button>
              </div>
            </fieldset>
          </div>
        )}

        {/* HARDWARE TAB */}
        {activeTab === "hardware" && (
          <div className="hardware-tab-content text-xs text-gray-900 space-y-3">
            {/* Device Manager Section */}
            <fieldset className="xp-groupbox p-3">
              <legend>Device Manager</legend>
              <p className="text-gray-700 mb-2">
                The Device Manager lists all the hardware devices installed on your computer. Use the Device Manager to change the properties of any device.
              </p>
              <div className="flex justify-end">
                <button
                  className="xp-dialog-btn px-4 font-semibold text-[#003399]"
                  onClick={() => setShowDeviceManager(true)}
                >
                  Device Manager
                </button>
              </div>
            </fieldset>

            {/* Drivers Section */}
            <fieldset className="xp-groupbox p-3">
              <legend>Drivers</legend>
              <p className="text-gray-700 mb-2">
                Driver Signing lets you make sure that installed hardware drivers are digitally verified.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  className="xp-dialog-btn px-3"
                  onClick={() => alert("All installed drivers are digitally signed by Microsoft Windows Hardware Quality Labs (WHQL).")}
                >
                  Driver Signing
                </button>
                <button
                  className="xp-dialog-btn px-3"
                  onClick={() => alert("Windows Update driver checking is active.")}
                >
                  Windows Update
                </button>
              </div>
            </fieldset>

            {/* Hardware Profiles */}
            <fieldset className="xp-groupbox p-3">
              <legend>Hardware Profiles</legend>
              <p className="text-gray-700 mb-2">
                Hardware profiles provide a way for you to set up and store different hardware configurations.
              </p>
              <div className="flex justify-end">
                <button
                  className="xp-dialog-btn px-3"
                  onClick={() => alert("Active Profile: Profile 1 (Current Default)")}
                >
                  Hardware Profiles
                </button>
              </div>
            </fieldset>
          </div>
        )}

        {/* ADVANCED TAB */}
        {activeTab === "advanced" && (
          <div className="advanced-tab-content text-xs text-gray-900 space-y-3">
            <p className="text-gray-600 text-[11px] mb-1">
              You must be logged on as an Administrator to make most of these changes.
            </p>

            <fieldset className="xp-groupbox p-2.5">
              <legend>Performance</legend>
              <p className="text-gray-700 mb-1.5 text-[11px]">
                Visual effects, processor scheduling, memory usage, and virtual memory.
              </p>
              <div className="flex justify-end">
                <button
                  className="xp-dialog-btn px-3"
                  onClick={() => alert("Performance Options: Total paging file size for all drives: 768 MB (Managed by system).")}
                >
                  Settings
                </button>
              </div>
            </fieldset>

            <fieldset className="xp-groupbox p-2.5">
              <legend>User Profiles</legend>
              <p className="text-gray-700 mb-1.5 text-[11px]">
                Desktop settings related to your logon.
              </p>
              <div className="flex justify-end">
                <button
                  className="xp-dialog-btn px-3"
                  onClick={() => alert("Active User Profile: ULYSSE-PC\\Ulysse (Computer administrator)")}
                >
                  Settings
                </button>
              </div>
            </fieldset>

            <div className="flex justify-end pt-1">
              <button
                className="xp-dialog-btn px-4 font-semibold text-[#003399]"
                onClick={() => setShowEnvVarsModal(true)}
              >
                Environment Variables...
              </button>
            </div>
          </div>
        )}

        {/* SYSTEM RESTORE TAB */}
        {activeTab === "restore" && (
          <div className="restore-tab-content text-xs text-gray-900 space-y-3">
            <p className="text-gray-700 leading-snug">
              System Restore can track and reverse harmful changes to your computer without affecting your personal data files, such as documents or email.
            </p>

            <div className="flex items-center gap-2 p-2 bg-white border border-[#716f64]">
              <input type="checkbox" id="disable-restore" defaultChecked={false} />
              <label htmlFor="disable-restore" className="cursor-pointer">
                Turn off System Restore on all drives
              </label>
            </div>

            <fieldset className="xp-groupbox p-3">
              <legend>Drive Status</legend>
              <div className="flex items-center justify-between p-2 bg-[#f8fafc] border border-[#d4d0c8]">
                <div className="flex items-center gap-2">
                  <HardDrive size={18} className="text-[#0055ea]" />
                  <div>
                    <span className="font-semibold block">Local Disk (C:)</span>
                    <span className="text-[10px] text-gray-500">80.0 GB Total (54.2 GB Free)</span>
                  </div>
                </div>
                <span className="text-[#16a34a] font-semibold flex items-center gap-1">
                  <CheckCircle2 size={14} /> Monitoring
                </span>
              </div>
            </fieldset>
          </div>
        )}

        {/* AUTOMATIC UPDATES TAB */}
        {activeTab === "updates" && (
          <div className="updates-tab-content text-xs text-gray-900 space-y-3">
            <div className="flex items-start gap-3 pb-2 border-b border-[#d4d0c8]">
              <Shield size={32} className="text-[#eab308] flex-shrink-0" />
              <div>
                <strong className="block text-gray-900 mb-0.5">
                  Help protect your PC
                </strong>
                <p className="text-gray-600 leading-tight">
                  Windows can regularly check for important updates and install them for you automatically.
                </p>
              </div>
            </div>

            <div className="space-y-2 pl-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="radio" name="updates" defaultChecked />
                <div>
                  <strong className="text-gray-900">Automatic (recommended)</strong>
                  <p className="text-gray-600 text-[11px]">
                    Automatically download recommended updates for my computer and install them every day at 3:00 AM.
                  </p>
                </div>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="radio" name="updates" />
                <div>
                  <strong className="text-gray-900">Download updates for me, but let me choose when to install them</strong>
                </div>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="radio" name="updates" />
                <div>
                  <strong className="text-gray-900">Notify me but don't automatically download or install them</strong>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* REMOTE TAB */}
        {activeTab === "remote" && (
          <div className="remote-tab-content text-xs text-gray-900 space-y-4">
            <fieldset className="xp-groupbox p-3">
              <legend>Remote Assistance</legend>
              <label className="flex items-center gap-2 cursor-pointer mb-2">
                <input type="checkbox" defaultChecked />
                <span>Allow Remote Assistance invitations to be sent from this computer</span>
              </label>
              <div className="flex justify-end">
                <button
                  className="xp-dialog-btn px-3"
                  onClick={() => alert("Remote Assistance: Port 3389 is listening.")}
                >
                  Advanced...
                </button>
              </div>
            </fieldset>

            <fieldset className="xp-groupbox p-3">
              <legend>Remote Desktop</legend>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked />
                <span>Allow users to connect remotely to this computer</span>
              </label>
            </fieldset>
          </div>
        )}
      </div>

      {/* Footer Dialog Action Buttons */}
      <div className="dialog-footer-buttons">
        <button className="xp-dialog-btn" onClick={() => closeWindow("system")}>
          OK
        </button>
        <button className="xp-dialog-btn" onClick={() => closeWindow("system")}>
          Cancel
        </button>
        <button className="xp-dialog-btn" onClick={() => closeWindow("system")}>
          Apply
        </button>
      </div>

      {/* AUTHENTIC OEM TECHNICAL SUPPORT INFORMATION MODAL */}
      {showSupportModal && (
        <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4">
          <div className="w-[380px] bg-[#ece9d8] border-2 border-[#0055ea] rounded shadow-2xl p-3 text-xs text-gray-900 font-sans">
            <div className="flex justify-between items-center pb-2 mb-2 border-b border-[#716f64] font-bold text-[#003399]">
              <span>Technical Support Information</span>
              <button
                className="px-1.5 py-0.5 bg-red-500 text-white font-bold rounded text-[10px]"
                onClick={() => setShowSupportModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 mb-4 bg-white p-3 border border-[#716f64] max-h-60 overflow-y-auto leading-relaxed">
              <div>
                <strong>Manufacturer:</strong> Genuine Intel Custom Desktop
              </div>
              <div>
                <strong>Model:</strong> Intel Pentium 4 Desktop PC (Socket 478)
              </div>
              <div>
                <strong>BIOS:</strong> Award Modular BIOS v6.00PG (08/14/03)
              </div>
              <div>
                <strong>Motherboard:</strong> ASUS P4P800 (Intel 865PE Chipset)
              </div>
              <div className="border-t border-gray-200 pt-1.5 mt-1.5 text-gray-700 text-[11px] space-y-1">
                <div>
                  <strong>Support Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST
                </div>
                <div>
                  <strong>Phone:</strong> 1-800-555-0199
                </div>
                <div>
                  <strong>Website:</strong>{" "}
                  <span className="text-[#0055ea] underline cursor-pointer">
                    http://support.intel.com/support/processors/pentium4
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-1.5 mt-1.5 text-gray-600 text-[10px]">
                For driver updates, motherboard chipsets, or hardware diagnostics, consult your system documentation or visit the official support portal.
              </div>
            </div>

            <div className="flex justify-end">
              <button
                className="xp-dialog-btn px-5 font-semibold"
                onClick={() => setShowSupportModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ERA-ACCURATE WINDOWS XP DEVICE MANAGER MODAL */}
      {showDeviceManager && (
        <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4">
          <div className="w-[440px] bg-[#ece9d8] border-2 border-[#0055ea] rounded shadow-2xl p-3 text-xs text-gray-900 font-sans">
            <div className="flex justify-between items-center pb-2 mb-2 border-b border-[#716f64] font-bold text-[#003399]">
              <div className="flex items-center gap-1.5">
                <Monitor size={16} />
                <span>Device Manager</span>
              </div>
              <button
                className="px-1.5 py-0.5 bg-red-500 text-white font-bold rounded text-[10px]"
                onClick={() => setShowDeviceManager(false)}
              >
                ✕
              </button>
            </div>

            {/* Tree View Container with authentic vintage PC hardware */}
            <div className="bg-white border border-[#716f64] p-2.5 h-72 overflow-y-auto space-y-1 font-mono text-[11px]">
              <div className="font-bold flex items-center gap-1 pb-1 text-gray-900">
                <Monitor size={14} className="text-[#0055ea]" />
                <span>ULYSSE-PC</span>
              </div>

              {/* Display Adapters */}
              <div className="pl-3">
                <div
                  className="flex items-center gap-1 cursor-pointer font-sans font-semibold text-gray-800 hover:text-blue-700"
                  onClick={() => toggleDevice("display")}
                >
                  {expandedDevices.display ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <span>Display adapters</span>
                </div>
                {expandedDevices.display && (
                  <div className="pl-5 text-gray-700 py-0.5 flex items-center gap-1.5">
                    <span className="text-green-600">▪</span> NVIDIA GeForce FX 5900 Ultra (256 MB AGP 8X)
                  </div>
                )}
              </div>

              {/* Processors */}
              <div className="pl-3">
                <div
                  className="flex items-center gap-1 cursor-pointer font-sans font-semibold text-gray-800 hover:text-blue-700"
                  onClick={() => toggleDevice("processors")}
                >
                  {expandedDevices.processors ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <span>Processors</span>
                </div>
                {expandedDevices.processors && (
                  <div className="pl-5 text-gray-700 py-0.5 space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <Cpu size={12} className="text-blue-500" />
                      <span>Intel(R) Pentium(R) 4 CPU 3.00GHz</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Sound Controllers */}
              <div className="pl-3">
                <div
                  className="flex items-center gap-1 cursor-pointer font-sans font-semibold text-gray-800 hover:text-blue-700"
                  onClick={() => toggleDevice("sound")}
                >
                  {expandedDevices.sound ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <span>Sound, video and game controllers</span>
                </div>
                {expandedDevices.sound && (
                  <div className="pl-5 text-gray-700 py-0.5 space-y-0.5">
                    <div>▪ Creative Sound Blaster Audigy 2 ZS (WDM)</div>
                    <div>▪ Realtek AC'97 Audio Controller</div>
                    <div>▪ Audio Codecs</div>
                    <div>▪ Legacy Audio Drivers</div>
                  </div>
                )}
              </div>

              {/* Disk Drives */}
              <div className="pl-3">
                <div
                  className="flex items-center gap-1 cursor-pointer font-sans font-semibold text-gray-800 hover:text-blue-700"
                  onClick={() => toggleDevice("disk")}
                >
                  {expandedDevices.disk ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <span>Disk drives</span>
                </div>
                {expandedDevices.disk && (
                  <div className="pl-5 text-gray-700 py-0.5">
                    ▪ Maxtor 6Y080L0 Ultra-ATA/133 (80 GB, 7200 RPM)
                  </div>
                )}
              </div>

              {/* DVD/CD-ROM drives */}
              <div className="pl-3">
                <div
                  className="flex items-center gap-1 cursor-pointer font-sans font-semibold text-gray-800 hover:text-blue-700"
                  onClick={() => toggleDevice("optical")}
                >
                  {expandedDevices.optical ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <span>DVD/CD-ROM drives</span>
                </div>
                {expandedDevices.optical && (
                  <div className="pl-5 text-gray-700 py-0.5 space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Disc size={12} /> SONY DVD-ROM DDU1612
                    </div>
                    <div className="flex items-center gap-1">
                      <Disc size={12} /> LITE-ON LTR-52327S (52x/32x/52x CD-RW)
                    </div>
                  </div>
                )}
              </div>

              {/* Floppy disk controllers */}
              <div className="pl-3">
                <div
                  className="flex items-center gap-1 cursor-pointer font-sans font-semibold text-gray-800 hover:text-blue-700"
                  onClick={() => toggleDevice("floppy")}
                >
                  {expandedDevices.floppy ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <span>Floppy disk drives</span>
                </div>
                {expandedDevices.floppy && (
                  <div className="pl-5 text-gray-700 py-0.5">
                    ▪ 3.5-inch 1.44 MB Floppy disk drive (A:)
                  </div>
                )}
              </div>

              {/* Network Adapters */}
              <div className="pl-3">
                <div
                  className="flex items-center gap-1 cursor-pointer font-sans font-semibold text-gray-800 hover:text-blue-700"
                  onClick={() => toggleDevice("network")}
                >
                  {expandedDevices.network ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <span>Network adapters</span>
                </div>
                {expandedDevices.network && (
                  <div className="pl-5 text-gray-700 py-0.5">
                    ▪ Realtek RTL8139 Family PCI Fast Ethernet NIC (10/100 Mbps)
                  </div>
                )}
              </div>

              {/* Ports (COM & LPT) */}
              <div className="pl-3">
                <div
                  className="flex items-center gap-1 cursor-pointer font-sans font-semibold text-gray-800 hover:text-blue-700"
                  onClick={() => toggleDevice("ports")}
                >
                  {expandedDevices.ports ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <span>Ports (COM & LPT)</span>
                </div>
                {expandedDevices.ports && (
                  <div className="pl-5 text-gray-700 py-0.5 space-y-0.5">
                    <div>▪ Communications Port (COM1)</div>
                    <div>▪ ECP Printer Port (LPT1)</div>
                  </div>
                )}
              </div>

              {/* Keyboards & Mice */}
              <div className="pl-3">
                <div
                  className="flex items-center gap-1 cursor-pointer font-sans font-semibold text-gray-800 hover:text-blue-700"
                  onClick={() => toggleDevice("input")}
                >
                  {expandedDevices.input ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  <span>Keyboards & Mice</span>
                </div>
                {expandedDevices.input && (
                  <div className="pl-5 text-gray-700 py-0.5 space-y-0.5">
                    <div>▪ Standard 101/102-Key PS/2 Keyboard</div>
                    <div>▪ Microsoft PS/2 IntelliMouse with Wheel</div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-2.5">
              <button
                className="xp-dialog-btn px-5 font-semibold"
                onClick={() => setShowDeviceManager(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VINTAGE XP ENVIRONMENT VARIABLES MODAL */}
      {showEnvVarsModal && (
        <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4">
          <div className="w-[410px] bg-[#ece9d8] border-2 border-[#0055ea] rounded shadow-2xl p-3 text-xs text-gray-900 font-sans">
            <div className="flex justify-between items-center pb-2 mb-2 border-b border-[#716f64] font-bold text-[#003399]">
              <span>Environment Variables</span>
              <button
                className="px-1.5 py-0.5 bg-red-500 text-white font-bold rounded text-[10px]"
                onClick={() => setShowEnvVarsModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="font-semibold block mb-1">User variables for Ulysse:</span>
                <div className="bg-white border border-[#716f64] p-2 h-24 overflow-y-auto font-mono text-[10px] space-y-1">
                  <div>TEMP = C:\DOCUME~1\ULYSSE\LOCALS~1\Temp</div>
                  <div>TMP = C:\DOCUME~1\ULYSSE\LOCALS~1\Temp</div>
                </div>
              </div>

              <div>
                <span className="font-semibold block mb-1">System variables:</span>
                <div className="bg-white border border-[#716f64] p-2 h-28 overflow-y-auto font-mono text-[10px] space-y-1">
                  <div>ComSpec = C:\WINDOWS\system32\cmd.exe</div>
                  <div>OS = Windows_NT</div>
                  <div>Path = C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem</div>
                  <div>PATHEXT = .COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH</div>
                  <div>PROCESSOR_ARCHITECTURE = x86</div>
                  <div>PROCESSOR_IDENTIFIER = x86 Family 15 Model 2 Stepping 9, GenuineIntel</div>
                  <div>PROCESSOR_LEVEL = 15</div>
                  <div>NUMBER_OF_PROCESSORS = 1</div>
                  <div>windir = C:\WINDOWS</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-3">
              <button
                className="xp-dialog-btn px-5 font-semibold"
                onClick={() => setShowEnvVarsModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
