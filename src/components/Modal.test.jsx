import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { expect } from 'vitest'
import Modal from './Modal';

const onClose = vi.fn();

describe('Modal', () => {
    beforeEach(() => {
        const modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'modal');
        document.body.appendChild(modalRoot);
        HTMLDialogElement.prototype.showModal = vi.fn();
        HTMLDialogElement.prototype.close = vi.fn();
    });
    afterEach(() => {
        const modalRoot = document.getElementById('modal');
        if (modalRoot) {
            modalRoot.remove();
        }
    });
    it('loads a dialog when open is true', () => {
        // arrange
        render(<Modal open={true} onClose={onClose} />)
        // assert
        const modalElement = screen.getByTestId('modal')
        expect(modalElement).toBeInTheDocument();
    })
    it('does not load a dialog when open is false', () => {
        // arrange
        render(<Modal open={false} onClose={onClose} />)
        // assert
        const modalElement = screen.getByTestId('modal')
        expect(modalElement).not.toBeVisible();
    })
})