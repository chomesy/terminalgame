

export default function TerminalWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col" style={{ height: '460px' , width: '660px', padding: '30px', borderRadius: '25px', boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)' }}> 
      {children}
    </div>
  );
}