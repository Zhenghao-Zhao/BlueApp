import { DiscardAlert } from "@/app/_components/alerts";
import Providers from "@/app/_contexts";
import Modal from "@/app/_contexts/providers/ModalContextProivder";
import { RenderResult, fireEvent, render } from "@testing-library/react";
import { ModalContent, ModalTrigger } from ".";

const OPEN_TEXT = "Open";
const CONTENT_TEXT = "Content";

const BasicModal = () => (
  <Providers>
    <Modal>
      <ModalContent>
        <div>{CONTENT_TEXT}</div>
      </ModalContent>
      <ModalTrigger>
        <button>{OPEN_TEXT}</button>
      </ModalTrigger>
    </Modal>
    <div id="modalPortal" />
  </Providers>
);

describe("Given basic modal", () => {
  let trigger: HTMLElement;
  let content: HTMLElement;
  let backdrop: HTMLElement;
  let rendered: RenderResult;

  beforeEach(() => {
    rendered = render(<BasicModal />);
    trigger = rendered.getByText(OPEN_TEXT);
  });
  describe("after clicking the trigger", () => {
    beforeEach(() => {
      fireEvent.click(trigger);
      content = rendered.getByText(CONTENT_TEXT);
      backdrop = rendered.getByRole("backdrop");
    });
    it("shows the correct content", async () => {
      expect(content).toBeVisible();
    });
    it("remains open when click onto content element", () => {
      fireEvent.click(content);
      expect(content).toBeVisible();
    });
    it("closes correctly when click backdrop", () => {
      fireEvent.click(backdrop);
      expect(content).not.toBeInTheDocument();
    });
  });
});

const ModalWithAlert = () => (
  <Providers>
    <Modal alert={<DiscardAlert />} initShowAlert={true}>
      <ModalContent>
        <div>Content</div>
      </ModalContent>
      <ModalTrigger>
        <button>Open</button>
      </ModalTrigger>
    </Modal>
    <div id="modalPortal" />
  </Providers>
);

describe("Given modal that alerts when user tries to close", () => {
  let trigger: HTMLElement;
  let backdrop: HTMLElement;
  let alertBox: HTMLElement;
  let rendered: RenderResult;

  beforeEach(() => {
    rendered = render(<ModalWithAlert />);
    trigger = rendered.getByText(OPEN_TEXT);
  });
  describe("after clicking the backdrop", () => {
    beforeEach(() => {
      fireEvent.click(trigger);
      backdrop = rendered.getByRole("backdrop");
    });
    it("shows alert when click backdrop", () => {
      fireEvent.click(backdrop);
      alertBox = rendered.getByRole("alert");
      expect(alertBox).toBeVisible();
    });
  });
});