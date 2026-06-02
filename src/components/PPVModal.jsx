import './PPVModal.css'

function PPVModal({ match, onActivate, onClose }) {
  return (
    <div className="ppv-backdrop" onClick={e => e.target === e.currentTarget && onClose?.()}>
      <div className="ppv-modal">
        {/* Icon */}
        <div className="ppv-icon">🎟️</div>

        <h2 className="ppv-title">Pay-Per-View</h2>

        <p className="ppv-match-name">{match?.title || 'Live Match'}</p>

        <div className="ppv-pricing">
          <div className="ppv-price-card">
            <span className="ppv-currency">₦</span>
            <span className="ppv-amount">500</span>
          </div>
          <span className="ppv-or">or</span>
          <div className="ppv-price-card ppv-secondary">
            <span className="ppv-currency">£</span>
            <span className="ppv-amount">3</span>
          </div>
        </div>

        <ul className="ppv-features">
          <li>✓ Full HD live stream</li>
          <li>✓ No adverts during play</li>
          <li>✓ Replay available for 24 hrs</li>
        </ul>

        <button className="ppv-activate-btn" onClick={() => onActivate?.(match?.id)}>
          Activate Access
        </button>

        <button className="ppv-cancel-btn" onClick={onClose}>
          Not now
        </button>

        <p className="ppv-disclaimer">
          This is a demo. No real payment will be charged.
        </p>
      </div>
    </div>
  )
}

export default PPVModal
