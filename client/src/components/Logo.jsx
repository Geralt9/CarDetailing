// A water droplet sitting on a flat panel: the beading you get on freshly sealed paint.
export default function Logo({ size = 36 }) {
  return (
    <svg className="logo" width={size} height={size} viewBox="0 0 36 36" aria-hidden="true">
      <rect width="36" height="36" rx="7" fill="currentColor" />
      <path d="M18 6.5c-4.4 6.4-7.4 10.2-7.4 13.9a7.4 7.4 0 0 0 14.8 0C25.4 16.7 22.4 12.9 18 6.5z" fill="#8EB8E5" />
      <path d="M14.6 20.6a3.6 3.6 0 0 0 3 3.5" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 30h22" stroke="#8EB8E5" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
