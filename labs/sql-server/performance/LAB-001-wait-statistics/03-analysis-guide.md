# Análisis de Wait Statistics

## 1. Concepto

Las Wait Statistics permiten identificar cuánto tiempo ha pasado
SQL Server esperando determinados recursos o eventos.

No representan por sí solas un diagnóstico definitivo.

## 2. Principales categorías

### CPU

Ejemplos:

- SOS_SCHEDULER_YIELD

Puede indicar presión de CPU cuando se correlaciona con:

- CPU elevada
- alta utilización de schedulers
- consultas con alto consumo de CPU

### I/O

Ejemplos:

- PAGEIOLATCH_*
- WRITELOG
- IO_COMPLETION

Debe correlacionarse con:

- latencia de almacenamiento
- throughput
- tamaño de las lecturas/escrituras
- comportamiento de los archivos de base de datos

### Bloqueos

Ejemplos:

- LCK_M_*

Debe analizarse junto con:

- sesiones bloqueadoras
- sesiones bloqueadas
- duración de transacciones
- índices
- aislamiento

### Paralelismo

Ejemplos:

- CXPACKET
- CXCONSUMER

No deben interpretarse automáticamente como un problema.

Se deben correlacionar con:

- planes de ejecución
- CPU
- configuración de paralelismo
- duración de consultas

## 3. Regla fundamental

Una Wait Statistic no debe analizarse de forma aislada.

Debe correlacionarse con:

Waits
  ↓
CPU / Memory / I/O
  ↓
Queries
  ↓
Execution Plans
  ↓
Indexes
  ↓
Blocking
  ↓
Jobs / ETL

## 4. Evidencia

Para cada análisis registrar:

- Fecha
- Instancia
- Base de datos relacionada
- Wait principal
- Tiempo acumulado
- Porcentaje
- Evidencia adicional
- Hipótesis
- Acción tomada
- Resultado posterior

## 5. Validación

Después de aplicar una optimización:

1. Capturar nuevamente las métricas.
2. Comparar contra la línea base.
3. Validar CPU.
4. Validar I/O.
5. Validar duración de consultas.
6. Validar bloqueos.
7. Documentar el resultado.

