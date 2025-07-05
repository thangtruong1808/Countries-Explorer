import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
  Paper,
  Skeleton
} from '@mui/material';
import {
  Close as CloseIcon,
  LocationOn as LocationIcon,
  Language as LanguageIcon,
  AttachMoney as CurrencyIcon,
  Phone as PhoneIcon,
  Public as ContinentIcon,
  Flag as FlagIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import type { Country } from '../types';
import { getCountryDescription } from '../utils/countryDescription';
import { getFlagUrl } from '../utils/flagUtils';
import { PRIMARY_COLORS, BACKGROUND_COLORS, BORDER_COLORS } from '../utils/colorUtils';
import { BORDER, BORDER_RADIUS, SPACING, ICON_STYLES } from '../utils/styleUtils';

interface CountryDetailProps {
  country: Country | null;
  open: boolean;
  onClose: () => void;
}

export const CountryDetail: React.FC<CountryDetailProps> = ({
  country,
  open,
  onClose
}) => {
  const navigate = useNavigate();
  const [description, setDescription] = useState<string>('');
  const [loadingDescription, setLoadingDescription] = useState<boolean>(false);

  const handleClose = () => {
    onClose();
  };

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
      // Use the local description function for now
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
      <DialogTitle sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pb: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        background: 'linear-gradient(135deg, rgba(100, 108, 255, 0.05) 0%, rgba(83, 91, 242, 0.05) 100%)',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            component="img"
            src={getFlagUrl(country.code)}
            alt={`Flag of ${country.name}`}
            sx={{
              width: 60,
              height: 40,
              borderRadius: 2,
              border: '2px solid',
              borderColor: 'divider',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
            {country.name}
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'text.primary',
              background: 'action.hover',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
          {/* Left Section - Flag and Description */}
          <Box sx={{ flex: { lg: '0 0 400px' } }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                background: 'background.default',
                mb: 3,
              }}
            >
              <Box
                component="img"
                src={getFlagUrl(country.code)}
                alt={`Flag of ${country.name}`}
                sx={{
                  width: '100%',
                  maxWidth: 250,
                  height: 175,
                  borderRadius: 3,
                  border: '3px solid',
                  borderColor: 'divider',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                  objectFit: 'cover',
                  mb: 2,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                {country.name}
              </Typography>
              <Chip
                label={country.continent.name}
                icon={<ContinentIcon />}
                sx={{
                  fontWeight: 600,
                  background: 'rgba(100, 108, 255, 0.1)',
                  color: 'primary.main',
                  border: '1px solid',
                  borderColor: 'primary.main',
                }}
              />
            </Paper>

            {/* Country Description */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                background: 'background.default',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <InfoIcon sx={ICON_STYLES.PRIMARY} />
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  About {country.name}
                </Typography>
              </Box>

              {loadingDescription ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Skeleton variant="text" width="100%" height={20} />
                  <Skeleton variant="text" width="90%" height={20} />
                  <Skeleton variant="text" width="95%" height={20} />
                  <Skeleton variant="text" width="85%" height={20} />
                </Box>
              ) : (
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                    textAlign: 'justify'
                  }}
                >
                  {description}
                </Typography>
              )}
            </Paper>
          </Box>

          {/* Right Section - Details */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Basic Information */}
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                background: 'background.default',
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                Basic Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LocationIcon sx={ICON_STYLES.PRIMARY} />
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      Capital:
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                    {country.capital || 'N/A'}
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <FlagIcon sx={ICON_STYLES.PRIMARY} />
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      Country Code:
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                    {country.code}
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Currency Information */}
            {country.currency && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: 'background.default',
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  Currency
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CurrencyIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                    {country.currency}
                  </Typography>
                </Box>
              </Paper>
            )}

            {/* Languages */}
            {country.languages && country.languages.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: 'background.default',
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  Languages
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <LanguageIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    Languages Spoken ({country.languages.length}):
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {country.languages.map((language, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        background: 'background.paper',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          background: 'action.hover',
                          transform: 'translateX(4px)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {language.name}
                        </Typography>
                        <Chip
                          label={language.rtl ? 'RTL' : 'LTR'}
                          size="small"
                          sx={{
                            fontSize: '0.65rem',
                            height: 20,
                            background: language.rtl ? 'rgba(255, 152, 0, 0.1)' : 'rgba(76, 175, 80, 0.1)',
                            color: language.rtl ? 'warning.main' : 'success.main',
                            border: '1px solid',
                            borderColor: language.rtl ? 'warning.main' : 'success.main',
                          }}
                        />
                      </Box>

                      {language.native && language.native !== language.name && (
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                          Native: {language.native}
                        </Typography>
                      )}

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: PRIMARY_COLORS.LIGHT,
                            opacity: 0.7,
                          }}
                        />
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                          {language.rtl ? 'Right-to-Left Script' : 'Left-to-Right Script'}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Language Statistics */}
                <Box sx={{ mt: SPACING.LG, p: SPACING.MD, borderRadius: BORDER_RADIUS.MEDIUM, background: BACKGROUND_COLORS.HOVER, border: '1px solid', borderColor: BORDER_COLORS.DIVIDER }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 1 }}>
                    Language Statistics:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <Chip
                      label={`${country.languages.length} Total`}
                      size="small"
                      sx={{
                        background: PRIMARY_COLORS.LIGHT,
                        color: 'primary.main',
                        border: '1px solid',
                        borderColor: 'primary.main',
                      }}
                    />
                    <Chip
                      label={`${country.languages.filter(lang => lang.rtl).length} RTL`}
                      size="small"
                      sx={{
                        background: 'rgba(255, 152, 0, 0.1)',
                        color: 'warning.main',
                        border: '1px solid',
                        borderColor: 'warning.main',
                      }}
                    />
                    <Chip
                      label={`${country.languages.filter(lang => !lang.rtl).length} LTR`}
                      size="small"
                      sx={{
                        background: 'rgba(76, 175, 80, 0.1)',
                        color: 'success.main',
                        border: '1px solid',
                        borderColor: 'success.main',
                      }}
                    />
                  </Box>
                </Box>
              </Paper>
            )}

            {/* Phone Code */}
            {country.phone && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: 'background.default',
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                  Contact Information
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                  <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                    +{country.phone}
                  </Typography>
                </Box>
              </Paper>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0, gap: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
          }}
        >
          Close
        </Button>
        <Button
          onClick={handleGoToPage}
          variant="contained"
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
          }}
        >
          Go to Page Detail
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 