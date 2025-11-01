import { StyleSheet, Platform, StatusBar } from 'react-native';

// ============ COLORES DE LA APLICACIÓN ============
export const colors = {
  primary: '#0fbd0f',
  primaryDark: '#0beb03ff',
  background: '#121212',
  backgroundLight: '#1e1e1e',
  surface: '#2a2a2a',
  surfaceLight: '#333',
  text: '#fff',
  textSecondary: '#999',
  textTertiary: '#666',
  error: '#ff4d4d',
  errorDark: '#ff4444',
  border: '#444',
  borderLight: '#eee',
  success: '#22c55e',
  info: '#007bff',
  black: '#000',
  white: '#fff',
  headerBg: '#222',
};

// ============ ESTILOS GLOBALES ============
export const styles = StyleSheet.create({
  // ==================== CONTENEDORES ====================
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  containerWithPadding: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  containerCenter: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: colors.background,
  },
  scrollContainerSingle: {
    padding: 16,
    paddingTop: 20,
  },
  card: {
    width: '85%',
    backgroundColor: colors.backgroundLight,
    padding: 20,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  cardWhite: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    width: '90%',
    shadowColor: colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  // ==================== HEADER ====================
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.headerBg,
  },
  logo: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoAccent: {
    color: colors.primaryDark,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    color: colors.white,
    marginRight: 8,
    fontSize: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  menuBtn: {
    marginLeft: 10,
  },
  menuBar: {
    width: 20,
    height: 2,
    backgroundColor: colors.white,
    marginVertical: 2,
  },

  // ==================== TEXTOS ====================
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  titleWhite: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 16,
  },
  sectionTitleCenter: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 16,
    textAlign: 'center',
  },
  textWhite: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 12,
  },
  textGray: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  textError: {
    color: colors.error,
    marginBottom: 8,
    marginLeft: 12,
    fontSize: 12,
  },
  textSmall: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  textBold: {
    fontWeight: 'bold',
  },
  textCenter: {
    textAlign: 'center',
  },
  link: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },

  // ==================== BOTONES ====================
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonSecondary: {
    backgroundColor: colors.border,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonSecondaryText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonDanger: {
    backgroundColor: colors.errorDark,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonDangerText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonPrimary: {
    backgroundColor: colors.primaryDark,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonSuccess: {
    backgroundColor: colors.success,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonInfo: {
    backgroundColor: colors.info,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  volverBtn: {
    width: '100%',
    backgroundColor: colors.primaryDark,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },

  // ==================== MODAL/SIDEBAR ====================
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalOverlayCenter: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebar: {
    backgroundColor: colors.surfaceLight,
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 350,
  },
  sidebarTitle: {
    color: colors.white,
    fontSize: 22,
    marginBottom: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  closeText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    color: colors.white,
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // ==================== FORMULARIOS ====================
  modalForm: {
    width: '90%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    maxHeight: '80%',
  },
  modalFormTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    color: colors.white,
    fontSize: 16,
  },
  inputMultiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: colors.success,
    borderRadius: 8,
    padding: 12,
    color: colors.white,
    backgroundColor: colors.surfaceLight,
    height: 120,
    marginBottom: 16,
    textAlignVertical: 'top',
    fontSize: 15,
  },

  // ==================== CALENDARIO ====================
  calendarioContainer: {
    backgroundColor: colors.backgroundLight,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryDark,
  },
  calendarioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  calendarioTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  plazoTexto: {
    color: colors.error,
    fontSize: 12,
    fontWeight: 'bold',
  },
  diasScroll: {
    paddingHorizontal: 12,
  },
  diaCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    minWidth: 70,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  diaCardSelected: {
    backgroundColor: colors.primaryDark,
    borderColor: colors.primaryDark,
  },
  diaNombre: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  diaFecha: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  diaTextoSelected: {
    color: colors.black,
  },
  checkMark: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.primaryDark,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: 'bold',
  },
  instruccion: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 16,
  },

  // ==================== TARJETAS (CARDS) ====================
  cardWrapper: {
    width: '47%',
    marginBottom: 12,
  },
  cardImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  cardSelected: {
    borderWidth: 3,
    borderColor: colors.primaryDark,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // ==================== TABLA/HISTORIAL ====================
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tableTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  tableDate: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: colors.surfaceLight,
    paddingBottom: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderColor: colors.borderLight,
  },
  cell: {
    fontSize: 14,
    color: colors.black,
  },
  cellHeader: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  colNombre: {
    width: '35%',
  },
  colObservaciones: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colCantidad: {
    width: '25%',
    textAlign: 'center',
  },
  observacionText: {
  color: colors.text,
  fontSize: 14,
  marginTop: 4,
},

  // ==================== BOTONES ESPECIALES ====================
  detalleBtn: {
    backgroundColor: colors.info,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  detalleBtnText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 13,
  },
  historyBtn: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.border,
    borderRadius: 8,
    alignItems: 'center',
  },
  historyText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  recoverBtn: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.border,
    borderRadius: 8,
    alignItems: 'center',
  },
  recoverText: {
    color: colors.primaryDark,
    fontWeight: 'bold',
  },
  logoutBtn: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.errorDark,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: colors.white,
    fontWeight: 'bold',
  },

  // ==================== MODAL DETALLE ====================
  modalOverlayDetalle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainerDetalle: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
  },
  modalHeaderDetalle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  modalTitleDetalle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.surfaceLight,
  },
  closeBtnDetalle: {
    padding: 4,
  },
  closeTextDetalle: {
    fontSize: 24,
    color: colors.textTertiary,
    fontWeight: 'bold',
  },
  menuInfoDetalle: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  menuNombreDetalle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.surfaceLight,
    marginBottom: 8,
  },
  infoRowDetalle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabelDetalle: {
    fontSize: 14,
    color: colors.textTertiary,
  },
  infoValueDetalle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.surfaceLight,
  },
  sectionTitleDetalle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.surfaceLight,
    marginBottom: 12,
  },
  detallesScroll: {
    maxHeight: 300,
  },
  detalleCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.info,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.info,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfoDetalle: {
    flex: 1,
  },
  userNameDetalle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.surfaceLight,
  },
  userEmailDetalle: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  fechaText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  cerrarBtnDetalle: {
    backgroundColor: '#6c757d',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  cerrarBtnTextDetalle: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },

  // ==================== LOGIN ESPECÍFICO ====================
  loginTestInfo: {
    marginTop: 20,
    padding: 12,
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  loginTestText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginVertical: 2,
  },

  // ==================== INFO BOXES ====================
  infoBox: {
    backgroundColor: colors.backgroundLight,
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  infoTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },

  // ==================== BOTONES DE MODAL ====================
  botonesModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  btnCancelar: {
    flex: 1,
    backgroundColor: colors.border,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnCancelarTexto: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnGuardar: {
    flex: 1,
    backgroundColor: colors.primaryDark,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnGuardarTexto: {
    color: colors.black,
    fontWeight: 'bold',
    fontSize: 16,
  },
});