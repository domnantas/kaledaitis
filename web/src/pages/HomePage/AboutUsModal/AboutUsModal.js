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
      Šventes šiemet sutinkame kiek neįprastu būdu, todėl ir kalėdaitis įgauna
      naują formą! Dalinkis virtualiu kalėdaičiu su artimaisiais / draugais /
      mylimaisiais, nesvarbu kuriam pasaulio krašte jie bebūtų 🌎 🌎 🌎
      <div>*sudėtyje nėra gliuteno / tinkamas vartoti veganams</div>
      <div>Dalinkis savo rūpesčiu saugiai!</div>
    </p>
  </div>
)

export default AboutUsModal
