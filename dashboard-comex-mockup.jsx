import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine, ReferenceDot, Cell, AreaChart, Area } from 'recharts';

export default function ComexDashboard() {
  const [activeTab, setActiveTab] = useState('frete');

  // Paleta Gamma
  const colors = {
    bg: '#E8F4EE',          // mint background
    cardLight: '#D4EBDE',   // mint card
    cardWhite: '#FFFFFF',   // white card
    navy: '#1A2E4A',        // dark navy text
    navyLight: '#3D5A7D',   // lighter navy
    green: '#1E5F4F',       // dark forest green (data)
    greenLight: '#4A9479',  // lighter green
    greenMint: '#7FC4A8',   // mint green accent
    greenPale: '#A8DCC6',   // pale mint
    accent: '#0F4D3F',      // very dark green for emphasis
  };

  const freightData = [
    { date: 'Jan/20', value: 1989 },
    { date: 'Abr/20', value: 1450 },
    { date: 'Jul/20', value: 500, event: 'Pandemia -75%' },
    { date: 'Out/20', value: 2100 },
    { date: 'Jan/21', value: 4500 },
    { date: 'Mar/21', value: 5200, event: 'Ever Given' },
    { date: 'Jun/21', value: 8200 },
    { date: 'Set/21', value: 10377, event: 'Pico +422%' },
    { date: 'Dez/21', value: 9300 },
    { date: 'Mar/22', value: 8800 },
    { date: 'Jun/22', value: 7200 },
    { date: 'Set/22', value: 4100 },
    { date: 'Dez/22', value: 2300, event: '-78% do pico' },
    { date: 'Mar/23', value: 1700 },
    { date: 'Jun/23', value: 1500 },
    { date: 'Set/23', value: 1450 },
    { date: 'Nov/23', value: 1600, event: 'Canal Panamá' },
    { date: 'Dez/23', value: 2400, event: 'Mar Vermelho' },
    { date: 'Mar/24', value: 3900 },
    { date: 'Jul/24', value: 5900, event: '+247% em 6m' },
    { date: 'Out/24', value: 3100 },
    { date: 'Jan/25', value: 3400 },
    { date: 'Abr/25', value: 2700, event: 'Liberation Day' },
    { date: 'Mai/25', value: 2350, event: 'Trégua 90d' },
    { date: 'Ago/25', value: 2100 },
    { date: 'Nov/25', value: 2280 },
    { date: 'Fev/26', value: 2150 },
    { date: 'Mai/26', value: 2280 }
  ];

  const tradeData = [
    { year: '2020', value: 103.1 },
    { year: '2021', value: 135.5 },
    { year: '2022', value: 150.1 },
    { year: '2023', value: 157.5 },
    { year: '2024', value: 157.7 }
  ];

  const ports = [
    { name: 'Santos', teu: 5.3 },
    { name: 'Paranaguá', teu: 1.2 },
    { name: 'Itajaí', teu: 1.15 },
    { name: 'Itapoá', teu: 1.1 },
    { name: 'Rio Grande', teu: 0.8 }
  ];

  const ncmData = [
    { cat: 'Eletroeletrônicos', code: '85', value: 18.2 },
    { cat: 'Máquinas', code: '84', value: 14.5 },
    { cat: 'Veículos/Autopeças', code: '87', value: 8.7 },
    { cat: 'Fertilizantes', code: '31', value: 6.3 },
    { cat: 'Químicos', code: '29/38', value: 5.8 },
    { cat: 'Têxteis', code: '61/62', value: 4.2 }
  ];

  const tabs = [
    { id: 'frete', label: 'Frete & Macro' },
    { id: 'comercio', label: 'Comércio BR-CN' },
    { id: 'simulador', label: 'Simulador' },
    { id: 'operacional', label: 'Operacional' },
    { id: 'competitiva', label: 'Intel. Competitiva' }
  ];

  const KPICard = ({ label, value, unit, sub }) => (
    <div style={{ background: colors.cardLight, borderRadius: '16px', padding: '20px' }}>
      <div style={{ fontSize: '11px', color: colors.navyLight, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px' }}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
        <span style={{ fontSize: '28px', fontWeight: 800, color: colors.navy, lineHeight: 1 }}>{value}</span>
        <span style={{ fontSize: '12px', color: colors.navyLight }}>{unit}</span>
      </div>
      {sub && <div style={{ fontSize: '11px', color: colors.green, fontWeight: 600, marginTop: '6px' }}>{sub}</div>}
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: colors.cardWhite, border: `2px solid ${colors.green}`, borderRadius: '8px', padding: '8px 12px', fontSize: '12px' }}>
          <div style={{ color: colors.navyLight, fontWeight: 600 }}>{label}</div>
          <div style={{ color: colors.navy, fontWeight: 800, fontSize: '14px' }}>US$ {payload[0].value.toLocaleString()}/FEU</div>
          {payload[0].payload.event && (
            <div style={{ color: colors.green, fontSize: '10px', marginTop: '4px', fontWeight: 700, textTransform: 'uppercase' }}>{payload[0].payload.event}</div>
          )}
        </div>
      );
    }
    return null;
  };

  const SectionTitle = ({ children, sub }) => (
    <div style={{ marginBottom: '16px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 800, color: colors.navy, lineHeight: 1.2, margin: 0 }}>{children}</h3>
      {sub && <p style={{ fontSize: '13px', color: colors.navyLight, margin: '4px 0 0 0' }}>{sub}</p>}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: colors.bg, fontFamily: '"Nunito", "Inter", system-ui, sans-serif', color: colors.navy }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" />
      
      {/* Header */}
      <header style={{ background: colors.cardWhite, borderBottom: `2px solid ${colors.cardLight}`, padding: '16px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 900, color: colors.navy, margin: 0, lineHeight: 1.1 }}>
              Dashboard Comex Ásia → Brasil
            </h1>
            <p style={{ fontSize: '12px', color: colors.navyLight, margin: '4px 0 0 0', fontWeight: 600 }}>
              Inteligência de Mercado para Importadores · 2019—2026
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: colors.green, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: colors.green }}></div>
              Live · 27.05.2026
            </div>
          </div>
        </div>

        {/* Tabs */}
        <nav style={{ display: 'flex', gap: '4px', marginTop: '16px', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                background: activeTab === tab.id ? colors.navy : 'transparent',
                color: activeTab === tab.id ? colors.bg : colors.navyLight,
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* TAB 1: FRETE */}
        {activeTab === 'frete' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <KPICard label="SCFI Shanghai" value="1.850" unit="pts" sub="↓ 4,0% w/w" />
              <KPICard label="Drewry WCI" value="2.280" unit="USD/FEU" sub="↓ 2,1% w/w" />
              <KPICard label="Freightos FBX13" value="3.600" unit="USD/FEU" sub="↑ 1,2% w/w" />
              <KPICard label="USD/BRL PTAX" value="5,45" unit="BRL" sub="↑ 0,3% d/d" />
            </div>

            {/* Main chart */}
            <div style={{ background: colors.cardWhite, borderRadius: '20px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <SectionTitle sub="Frete marítimo composite · USD por FEU · Drewry WCI">
                  Oscilações do Frete China → Brasil
                </SectionTitle>
                <div style={{ background: colors.cardLight, padding: '8px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, color: colors.navy }}>
                  Amplitude: <span style={{ color: colors.green }}>−75%</span> a <span style={{ color: colors.green }}>+422%</span>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={freightData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                  <defs>
                    <linearGradient id="freightGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={colors.green} stopOpacity={0.3}/>
                      <stop offset="100%" stopColor={colors.green} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.greenPale} />
                  <XAxis dataKey="date" stroke={colors.navyLight} tick={{ fontSize: 11, fontWeight: 600 }} interval={2} />
                  <YAxis stroke={colors.navyLight} tick={{ fontSize: 11, fontWeight: 600 }} tickFormatter={(v) => `${(v/1000).toFixed(1)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine y={1989} stroke={colors.navyLight} strokeDasharray="4 4" label={{ value: 'Baseline 1.989', position: 'left', fill: colors.navyLight, fontSize: 10, fontWeight: 600 }} />
                  <Area type="monotone" dataKey="value" stroke={colors.green} strokeWidth={2.5} fill="url(#freightGradient)" />
                  <ReferenceDot x="Jul/20" y={500} r={5} fill={colors.accent} stroke={colors.cardWhite} strokeWidth={2} />
                  <ReferenceDot x="Set/21" y={10377} r={7} fill={colors.accent} stroke={colors.cardWhite} strokeWidth={2} />
                  <ReferenceDot x="Jul/24" y={5900} r={6} fill={colors.accent} stroke={colors.cardWhite} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>

              {/* Event timeline below */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${colors.cardLight}` }}>
                {[
                  { date: 'Jul/20', label: 'Pandemia', val: '−75%' },
                  { date: 'Set/21', label: 'Pico histórico', val: '+422%' },
                  { date: 'Dez/22', label: 'Reversão', val: '−78%' },
                  { date: 'Jul/24', label: 'Mar Vermelho', val: '+247%' },
                  { date: 'Mai/25', label: 'Trégua', val: 'estab.' }
                ].map(e => (
                  <div key={e.date} style={{ borderLeft: `3px solid ${colors.green}`, paddingLeft: '10px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: colors.navyLight, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{e.date}</div>
                    <div style={{ fontSize: '12px', color: colors.navy, fontWeight: 600, marginTop: '2px' }}>{e.label}</div>
                    <div style={{ fontSize: '14px', fontWeight: 900, color: colors.green, marginTop: '2px' }}>{e.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom row */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              <div style={{ background: colors.cardWhite, borderRadius: '20px', padding: '24px' }}>
                <SectionTitle sub="ANTAQ · 2024 · milhões de TEU">Concentração Portuária</SectionTitle>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={ports} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.greenPale} horizontal={false} />
                    <XAxis type="number" stroke={colors.navyLight} tick={{ fontSize: 11, fontWeight: 600 }} />
                    <YAxis dataKey="name" type="category" stroke={colors.navyLight} tick={{ fontSize: 12, fontWeight: 700 }} />
                    <Tooltip contentStyle={{ background: colors.cardWhite, border: `2px solid ${colors.green}`, borderRadius: '8px', fontSize: 12 }} />
                    <Bar dataKey="teu" radius={[0, 8, 8, 0]}>
                      {ports.map((p, i) => (
                        <Cell key={i} fill={i === 0 ? colors.green : i === 1 ? colors.greenLight : colors.greenMint} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: colors.cardLight, borderRadius: '20px', padding: '24px' }}>
                <SectionTitle>Alertas Ativos</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: colors.cardWhite, borderRadius: '12px', padding: '12px', borderLeft: `4px solid ${colors.green}` }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: colors.green, textTransform: 'uppercase' }}>Atenção</div>
                    <div style={{ fontSize: '12px', color: colors.navy, marginTop: '4px', fontWeight: 600 }}>USD/BRL +3,2% sobre média 30d</div>
                  </div>
                  <div style={{ background: colors.cardWhite, borderRadius: '12px', padding: '12px', borderLeft: `4px solid ${colors.greenMint}` }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: colors.greenLight, textTransform: 'uppercase' }}>Normal</div>
                    <div style={{ fontSize: '12px', color: colors.navy, marginTop: '4px', fontWeight: 600 }}>SCFI dentro da banda esperada</div>
                  </div>
                  <div style={{ background: colors.cardWhite, borderRadius: '12px', padding: '12px', borderLeft: `4px solid ${colors.navyLight}` }}>
                    <div style={{ fontSize: '10px', fontWeight: 800, color: colors.navyLight, textTransform: 'uppercase' }}>Info</div>
                    <div style={{ fontSize: '12px', color: colors.navy, marginTop: '4px', fontWeight: 600 }}>Trégua EUA-CN expira em 12 dias</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COMÉRCIO */}
        {activeTab === 'comercio' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <KPICard label="Corrente 2024" value="157,7" unit="US$ bi" sub="↑ 0,1% a/a" />
              <KPICard label="Saldo 2024" value="+31,1" unit="US$ bi" sub="↓ 39% vs 2023" />
              <KPICard label="Part. nas Importações" value="24,3" unit="%" sub="↑ 1,2 p.p." />
              <KPICard label="Crescimento 4a" value="+53" unit="%" sub="2020 → 2024" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: colors.cardWhite, borderRadius: '20px', padding: '24px' }}>
                <SectionTitle sub="MDIC ComexStat · US$ bilhões">Corrente Bilateral Brasil-China</SectionTitle>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={tradeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.greenPale} vertical={false} />
                    <XAxis dataKey="year" stroke={colors.navyLight} tick={{ fontSize: 12, fontWeight: 700 }} />
                    <YAxis stroke={colors.navyLight} tick={{ fontSize: 11, fontWeight: 600 }} />
                    <Tooltip contentStyle={{ background: colors.cardWhite, border: `2px solid ${colors.green}`, borderRadius: '8px', fontSize: 12 }} />
                    <Bar dataKey="value" fill={colors.green} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <p style={{ fontSize: '13px', color: colors.navy, marginTop: '12px', fontWeight: 600 }}>
                  Crescimento de <span style={{ color: colors.green, fontWeight: 800 }}>53%</span> no período · Saldo recorde de <span style={{ color: colors.green, fontWeight: 800 }}>US$ 51,1 bi</span> em 2023
                </p>
              </div>

              <div style={{ background: colors.cardWhite, borderRadius: '20px', padding: '24px' }}>
                <SectionTitle sub="Top capítulos NCM · US$ bilhões 2024">Pauta Importadora da China</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '8px' }}>
                  {ncmData.map(n => (
                    <div key={n.cat}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                        <span style={{ color: colors.navy, fontWeight: 700 }}>
                          <span style={{ color: colors.greenLight, fontWeight: 700, fontSize: '11px', marginRight: '8px' }}>NCM {n.code}</span>
                          {n.cat}
                        </span>
                        <span style={{ color: colors.green, fontWeight: 800 }}>{n.value}</span>
                      </div>
                      <div style={{ height: '8px', background: colors.cardLight, borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: `linear-gradient(90deg, ${colors.green}, ${colors.greenLight})`, width: `${(n.value / 20) * 100}%`, borderRadius: '4px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SIMULADOR */}
        {activeTab === 'simulador' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: colors.cardWhite, borderRadius: '20px', padding: '24px' }}>
              <SectionTitle sub="Cálculo do Custo Total Landed com sensibilidade">Simulador de Custo de Importação</SectionTitle>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '16px' }}>
                {/* Inputs */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: colors.navyLight, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Entradas</div>
                  
                  {[
                    { label: 'NCM', val: '8517.13.00' },
                    { label: 'Valor FOB (USD)', val: '100.000,00' },
                    { label: 'Frete (USD)', val: '2.280,00' },
                    { label: 'PTAX', val: 'R$ 5,45' },
                    { label: 'UF Destino', val: 'SP · ICMS 18%' }
                  ].map(i => (
                    <div key={i.label}>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: colors.navyLight, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{i.label}</label>
                      <div style={{ background: colors.cardLight, padding: '10px 14px', marginTop: '4px', borderRadius: '10px', fontSize: '15px', fontWeight: 700, color: colors.navy }}>{i.val}</div>
                    </div>
                  ))}
                </div>

                {/* Output */}
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: colors.navyLight, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Breakdown</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      { item: 'Valor FOB', val: 'R$ 545.000', pct: '64,1%' },
                      { item: 'Frete + Seguro', val: 'R$ 12.426', pct: '1,5%' },
                      { item: 'AFRMM (8%)', val: 'R$ 994', pct: '0,1%' },
                      { item: 'I.I. (12%)', val: 'R$ 66.891', pct: '7,9%' },
                      { item: 'IPI (10%)', val: 'R$ 62.432', pct: '7,3%' },
                      { item: 'PIS/COFINS', val: 'R$ 67.892', pct: '8,0%' },
                      { item: 'ICMS (18%)', val: 'R$ 95.745', pct: '11,2%' }
                    ].map(b => (
                      <div key={b.item} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '6px 0', borderBottom: `1px solid ${colors.cardLight}` }}>
                        <span style={{ color: colors.navyLight, fontWeight: 600 }}>{b.item}</span>
                        <div>
                          <span style={{ color: colors.navy, fontWeight: 700 }}>{b.val}</span>
                          <span style={{ color: colors.greenLight, marginLeft: '10px', fontSize: '11px', fontWeight: 700 }}>{b.pct}</span>
                        </div>
                      </div>
                    ))}
                    <div style={{ background: colors.green, color: colors.cardWhite, padding: '14px 16px', borderRadius: '12px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Landed</span>
                      <span style={{ fontSize: '22px', fontWeight: 900 }}>R$ 851.380</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '24px', paddingTop: '20px', borderTop: `1px solid ${colors.cardLight}` }}>
                <div style={{ background: colors.cardLight, borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: colors.navyLight, textTransform: 'uppercase' }}>Sensibilidade ±10% Frete</div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: colors.navy, marginTop: '4px' }}>± R$ 1.243</div>
                </div>
                <div style={{ background: colors.cardLight, borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: colors.navyLight, textTransform: 'uppercase' }}>Sensibilidade ±5% Câmbio</div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: colors.green, marginTop: '4px' }}>± R$ 42.569</div>
                </div>
                <div style={{ background: colors.cardLight, borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: colors.navyLight, textTransform: 'uppercase' }}>Custo Unitário</div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: colors.navy, marginTop: '4px' }}>R$ 851,38</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: OPERACIONAL */}
        {activeTab === 'operacional' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <KPICard label="Contêineres em Trânsito" value="47" unit="un" sub="3 com atraso" />
              <KPICard label="Lead Time Médio" value="58" unit="dias" sub="vs 52 benchmark" />
              <KPICard label="% Canal Verde" value="76" unit="%" sub="↑ 4 p.p. m/m" />
              <KPICard label="Demurrage MTD" value="R$ 18,4" unit="mil" sub="dentro budget" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: colors.cardWhite, borderRadius: '20px', padding: '24px' }}>
                <SectionTitle sub="Últimos 90 dias · DI/DUIMP">Distribuição de Canais Aduaneiros</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                  {[
                    { canal: 'Verde', pct: 76, color: colors.green, count: 142 },
                    { canal: 'Amarelo', pct: 18, color: '#D4A53A', count: 34 },
                    { canal: 'Vermelho', pct: 5, color: '#B5483A', count: 9 },
                    { canal: 'Cinza', pct: 1, color: colors.navyLight, count: 2 }
                  ].map(c => (
                    <div key={c.canal}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                        <span style={{ color: colors.navy, fontWeight: 700 }}>Canal {c.canal}</span>
                        <span style={{ color: colors.navyLight, fontWeight: 600 }}>{c.count} DI · {c.pct}%</span>
                      </div>
                      <div style={{ height: '10px', background: colors.cardLight, borderRadius: '5px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: c.color, width: `${c.pct}%`, borderRadius: '5px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: colors.cardWhite, borderRadius: '20px', padding: '24px' }}>
                <SectionTitle>Embarques em Trânsito</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
                  {[
                    { id: 'MSCU8847291', status: 'A bordo', eta: '03/06', terminal: 'Santos BTP', alert: false },
                    { id: 'CMAU9923847', status: 'Em desembaraço', eta: '28/05', terminal: 'Santos BTP', alert: true },
                    { id: 'HLBU7734922', status: 'Free time D+2', eta: 'Vencido', terminal: 'Itapoá', alert: true },
                    { id: 'MAEU8891234', status: 'Embarcado origem', eta: '12/06', terminal: 'Paranaguá', alert: false }
                  ].map(c => (
                    <div key={c.id} style={{ background: colors.cardLight, padding: '12px 14px', borderRadius: '12px', borderLeft: c.alert ? `4px solid ${colors.green}` : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: colors.navy }}>{c.id}</div>
                        <div style={{ fontSize: '11px', color: colors.navyLight, fontWeight: 600, marginTop: '2px' }}>{c.terminal}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', color: c.alert ? colors.green : colors.navy, fontWeight: 700 }}>{c.status}</div>
                        <div style={{ fontSize: '11px', color: colors.navyLight, fontWeight: 600, marginTop: '2px' }}>ETA {c.eta}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: COMPETITIVA */}
        {activeTab === 'competitiva' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
              <KPICard label="Market Share NCM 8517" value="8,3" unit="%" sub="4º colocado" />
              <KPICard label="HHI Fornecedores" value="2.847" unit="pts" sub="alta concentração" />
              <KPICard label="Exportadores Ativos" value="12" unit="un" sub="↑ +2 vs 2024" />
              <KPICard label="Risco País CN" value="Médio" unit="" sub="trégua até 10/08" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: colors.cardWhite, borderRadius: '20px', padding: '24px' }}>
                <SectionTitle sub="Importadores brasileiros · NCM 8517.13.00">Ranking Competitivo</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
                  {[
                    { rank: '01', name: 'Importadora A', share: 22.4, mine: false },
                    { rank: '02', name: 'Tech Solutions B', share: 18.1, mine: false },
                    { rank: '03', name: 'Distribuidora C', share: 11.7, mine: false },
                    { rank: '04', name: 'SUA EMPRESA', share: 8.3, mine: true },
                    { rank: '05', name: 'Importadora D', share: 7.2, mine: false },
                    { rank: '06', name: 'Comercial E', share: 5.8, mine: false }
                  ].map(c => (
                    <div key={c.rank} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '12px', background: c.mine ? colors.green : colors.cardLight }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: c.mine ? colors.cardWhite : colors.navyLight, width: '24px' }}>{c.rank}</span>
                      <span style={{ flex: 1, fontSize: '13px', fontWeight: 700, color: c.mine ? colors.cardWhite : colors.navy }}>{c.name}</span>
                      <div style={{ width: '100px', height: '6px', background: c.mine ? 'rgba(255,255,255,0.3)' : colors.greenPale, borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: c.mine ? colors.cardWhite : colors.green, width: `${(c.share / 25) * 100}%`, borderRadius: '3px' }}></div>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: c.mine ? colors.cardWhite : colors.green, width: '44px', textAlign: 'right' }}>{c.share}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: colors.cardWhite, borderRadius: '20px', padding: '24px' }}>
                <SectionTitle sub="Origem dos fornecedores chineses">Concentração por Província</SectionTitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '8px' }}>
                  {[
                    { prov: 'Guangdong', count: 5, vol: 42 },
                    { prov: 'Zhejiang', count: 3, vol: 28 },
                    { prov: 'Jiangsu', count: 2, vol: 18 },
                    { prov: 'Shanghai', count: 1, vol: 8 },
                    { prov: 'Outros', count: 1, vol: 4 }
                  ].map(p => (
                    <div key={p.prov}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                        <span style={{ color: colors.navy, fontWeight: 700 }}>
                          {p.prov} <span style={{ color: colors.navyLight, fontSize: '11px', fontWeight: 600, marginLeft: '6px' }}>{p.count} fornec.</span>
                        </span>
                        <span style={{ color: colors.green, fontWeight: 800 }}>{p.vol}%</span>
                      </div>
                      <div style={{ height: '8px', background: colors.cardLight, borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', background: colors.green, width: `${p.vol * 2}%`, borderRadius: '4px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '20px', padding: '14px', background: colors.cardLight, borderRadius: '12px', borderLeft: `4px solid ${colors.green}` }}>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: colors.green, textTransform: 'uppercase' }}>⚠ HHI = 2.847</div>
                  <div style={{ fontSize: '12px', color: colors.navy, fontWeight: 600, marginTop: '4px' }}>Alta concentração · Recomendação: diversificar para Vietnã ou Índia</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer note */}
        <div style={{ marginTop: '24px', padding: '16px 20px', background: colors.cardLight, borderRadius: '16px', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: colors.navyLight, margin: 0, fontWeight: 600 }}>
            <strong style={{ color: colors.navy }}>Mockup ilustrativo</strong> · Dados das abas Frete, Comércio e Simulador baseados em fontes oficiais (MDIC, ANTAQ, Drewry, SCFI, Freightos) · Dados das abas Operacional e Competitiva são fictícios e cumprem função demonstrativa
          </p>
        </div>
      </main>
    </div>
  );
}
