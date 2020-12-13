import './Kaledaitis.css'

const Kaledaitis = ({ setStage }) => {
  return (
    <svg
      width="337"
      height="652"
      viewBox="0 0 337 652"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="kaledaitis"
      onClick={() => setStage('vardas')}
    >
      <path
        d="M12.428 82.2451L283.915 7.24787L328.64 540.726L66.0387 650.15L12.428 82.2451Z"
        fill="white"
        stroke="black"
      />
      <path
        d="M60.8812 648.744L6.20559 77.4334L281.768 1.99996"
        stroke="black"
        strokeWidth="3"
      />
    </svg>
  )
}

export default Kaledaitis
