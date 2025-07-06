import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import type { Country } from '../../types';
import { getCountryDescription } from '../../utils/countryDescription';
import { CountryDetailHeader } from './CountryDetailHeader';
import { CountryDetailContent } from './CountryDetailContent';
import { CountryDetailActions } from './CountryDetailActions';

interface CountryDetailProps {
  country: Country | null;
  open: boolean;
  onClose: () => void;
}

/**
 * Main CountryDetail modal component that displays comprehensive country information.
 */
export const CountryDetail: React.FC<CountryDetailProps> = ({
  country,
  open,
  onClose
}) => {
  const navigate = useNavigate();
  const [description, setDescription] = useState<string>('');
  const [loadingDescription, setLoadingDescription] = useState<boolean>(false);

  /**
   * Handles modal close action.
   */
  const handleClose = () => {
    onClose();
  };

  /**
   * Navigates to the dedicated country page and closes modal.
   */
  const handleGoToPage = () => {
    if (country) {
      navigate(`/country/${country.code}`);
      onClose();
    }
  };

  // Load country description when country changes
  useEffect(() => {
    if (country) {
      setLoadingDescription(true);
      const desc = getCountryDescription(country.name);
      setDescription(desc);
      setLoadingDescription(false);
    }
  }, [country]);

  if (!country) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: 'background.paper',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
          border: '1px solid',
          borderColor: 'divider',
        }
      }}
    >
      <CountryDetailHeader country={country} onClose={handleClose} />

      <DialogContent sx={{ p: 4, mt: 2 }}>
        <CountryDetailContent
          country={country}
          description={description}
          loadingDescription={loadingDescription}
        />
      </DialogContent>

      <CountryDetailActions onClose={handleClose} onGoToPage={handleGoToPage} />
    </Dialog>
  );
}; 