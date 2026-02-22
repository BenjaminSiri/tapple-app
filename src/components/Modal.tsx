import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
    from { transform: translateY(-100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
`;

const slideUp = keyframes`
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-100%); opacity: 0; }
`;

const fadeIn = keyframes`
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
`;

const fadeOut = keyframes`
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.95); }
`;

const Backdrop = styled.div<{ $closing: boolean; $variant: 'pulldown' | 'center' }>`
    position: fixed;
    inset: 0;
    z-index: 101;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    animation: ${({ $closing, $variant }) => {
        if ($variant === 'pulldown') return $closing ? slideUp : slideDown;
        return $closing ? fadeOut : fadeIn;
    }} 0.3s ease forwards;
`;

const ModalCard = styled.div`
    background-color: var(--color-primary);
    border: 3px solid var(--text-primary);
    border-radius: 24px;
    padding: 32px 24px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 100%;
    max-width: 440px;
    margin: 24px;
`;

const PullTab = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 102;
    background-color: var(--color-primary);
    border: 3px solid var(--text-primary);
    border-top: none;
    border-radius: 0 0 20px 20px;
    padding: 2px 16px 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

interface ModalProps {
    open: boolean;
    onClose: () => void;
    variant?: 'pulldown' | 'center';
    tab?: React.ReactNode;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, variant = 'center', tab, children }) => {
    const [closing, setClosing] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (open) {
            setVisible(true);
            setClosing(false);
        } else if (visible) {
            setClosing(true);
            const timer = setTimeout(() => {
                setVisible(false);
                setClosing(false);
            }, 280);
            return () => clearTimeout(timer);
        }
    }, [open]);

    if (!visible) return null;

    return (
        <>
            {variant === 'pulldown' && tab && (
                <PullTab onClick={onClose}>{tab}</PullTab>
            )}
            <Backdrop $closing={closing} $variant={variant} onClick={onClose}>
                <ModalCard onClick={(e) => e.stopPropagation()}>
                    {children}
                </ModalCard>
            </Backdrop>
        </>
    );
};

export default Modal;