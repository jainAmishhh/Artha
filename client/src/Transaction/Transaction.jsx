import React from 'react';
import { Moon, ArrowRightLeft, Send, Clock, Wallet } from 'lucide-react';

export default function CryptoHistoryDashboard() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans flex">
      {/* Sidebar */}
      <aside className="w-[15%] bg-[#121212] p-6 flex flex-col justify-between">
        <div>
          <div className="mb-10">
            <button className="bg-white text-black p-3 rounded-full">
              <Wallet size={20} />
            </button>
          </div>
          <nav className="space-y-6">
            <NavItem icon={<Wallet size={20} />} label="Portfolio" />
            <NavItem icon={<Clock size={20} />} label="Txns History" active />
            <NavItem icon={<Send size={20} />} label="Send" />
            <NavItem icon={<ArrowRightLeft size={20} />} label="Stake" tag="Coming Soon" />
          </nav>
        </div>
        <div className="space-y-4">
          <div className="text-gray-400 text-xs">Learn Web3</div>
          <div className="text-sm text-gray-500">Access resources to valuable crypto resources</div>
          <button className="mt-4 p-2 rounded-full bg-[#1f1f1f]">
            <Moon size={16} className="mx-auto text-white" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search Address, Txn hash, Token or chain"
            className="bg-[#1a1a1a] text-white p-3 w-1/2 rounded-md"
          />
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">All Network</span>
            <img
              src="https://i.pravatar.cc/40"
              className="w-10 h-10 rounded-full"
              alt="User Avatar"
            />
          </div>
        </header>

        <section className="flex gap-6">
          {/* Left Panel - History List */}
          <div className="w-2/3 bg-[#1a1a1a] p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">History</h2>
            <div className="text-sm space-y-6">
              <DayHistory
                day="Today"
                txns={[
                  { time: '11:37 pm', type: 'Swap', app: 'Bungee', amount: '24 ETH → 76,800 USDC' },
                  { time: '10:20 pm', type: 'Stake', app: 'Stargate', amount: '24 ETH' },
                  { time: '11:37 pm', type: 'Receive', address: '0x4982...89cb', token: '12 BNB' },
                  { time: '11:37 pm', type: 'Send', address: '0x4982...89cb', token: '12 BNB' },
                  { time: '11:37 pm', type: 'Bridge', address: '0x4982...89cb', token: '12 BNB' },
                ]}
              />
              <DayHistory
                day="Yesterday"
                txns={[
                  { time: '11:37 pm', type: 'Add Liquidity', app: 'Gempad', amount: '2.5 ETH + 25,937,937,938 PEPE' },
                  { time: '11:37 pm', type: 'Receive', address: '0x4982...89cb', token: '12 BNB' },
                ]}
              />
            </div>
          </div>

          {/* Right Panel - Txn Details */}
          <div className="w-1/3 bg-[#1a1a1a] p-6 rounded-xl flex flex-col justify-between">
            <div>
              <div className="text-sm text-gray-400 mb-2">Swap from</div>
              <div className="text-lg mb-4">24 ETH → 76,800 USDC</div>
              <div className="text-xs text-gray-400 mb-4">Txn hash: 0x5155704abb...</div>
              <div className="text-sm mb-2">Application: <span className="text-orange-400">Bungee Exchange</span></div>
              <div className="text-sm mb-2">Network: <span className="text-blue-400">Arbitrum</span></div>
              <div className="text-sm text-gray-400">Time: Jul-14-2024 11:37:35 AM UTC</div>
            </div>
            <div className="flex gap-4 text-xs text-gray-400 mt-6">
              <div className="flex-1 p-3 bg-[#2a2a2a] rounded-xl">
                <div>Fee</div>
                <div className="text-white">0.000002 ETH</div>
              </div>
              <div className="flex-1 p-3 bg-[#2a2a2a] rounded-xl">
                <div>Gas Price</div>
                <div className="text-white">11.615476278</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, tag }) {
  return (
    <div className={`flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer transition-colors ${
      active ? 'bg-[#1f1f1f]' : 'hover:bg-[#1a1a1a]'}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm">{label}</span>
      </div>
      {tag && <span className="text-[10px] px-2 py-1 rounded bg-gray-700 text-gray-400">{tag}</span>}
    </div>
  );
}

function DayHistory({ day, txns }) {
  return (
    <div>
      <h3 className="text-gray-400 text-sm mb-3">{day}</h3>
      <div className="space-y-3">
        {txns.map((txn, idx) => (
          <div key={idx} className="flex justify-between items-start text-sm">
            <div className="text-gray-400 w-24">{txn.time}</div>
            <div className="flex-1">
              <div className="text-white font-medium">{txn.type}</div>
              {txn.app && <div className="text-gray-400">{txn.app}</div>}
              {txn.address && <div className="text-gray-400">{txn.address}</div>}
              {txn.token && <div className="text-yellow-400">{txn.token}</div>}
              {txn.amount && <div className="text-blue-400">{txn.amount}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
