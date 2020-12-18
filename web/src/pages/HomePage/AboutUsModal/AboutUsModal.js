import './AboutUsModal.css'

const CloseButton = () => (
  <svg
    width="24"
    height="22"
    viewBox="0 0 24 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1 1L23 21" stroke="black" />
    <path d="M23 1L1 21" stroke="black" />
  </svg>
)

const AboutUsModal = ({ closeModal }) => (
  <div className="modal">
    <div className="close-button" onClick={closeModal}>
      <CloseButton />
    </div>
    <h2>kas? kaip? kodėl?</h2>
    <p>
      Čia bus informacija apie projektą. Tai ne pelno siekinatis projektas,
      skatinantis šiuo sunkiu, tačiau būtinu laikotarpiu, saugoti save ir savo
      artimuosius ir dalintis kalėdaičiu virtualiai, taip išvengiant papildomo
      pavojaus. Siųskite savo kalėdaičius draugams/giminėms/mylimiesiems ir
      parodykit dėmesį saugiai. Čia bus informacija apie projektą. Tai ne pelno
      siekinatis projektas,
    </p>
  </div>
)

export default AboutUsModal
