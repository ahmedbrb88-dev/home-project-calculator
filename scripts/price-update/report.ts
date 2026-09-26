import { UpdateReport } from './types.js';

export function generateReportString(report: UpdateReport): string {
  let out = `PRICE UPDATE REPORT\n\n`;
  out += `Run:\n${report.date}\n\n`;
  out += `Sources checked:\n${report.sourcesChecked}\n\n`;
  out += `Prices found:\n${report.pricesFound}\n\n`;
  out += `Prices accepted:\n${report.pricesAccepted}\n\n`;
  out += `Prices rejected:\n${report.pricesRejected}\n\n`;
  out += `Prices unchanged:\n${report.pricesUnchanged}\n\n`;
  out += `Prices updated:\n${report.pricesUpdated}\n\n`;
  out += `Errors:\n${report.errors}\n\n`;
  out += `Warnings:\n${report.warnings}\n\n`;

  if (report.rejections.length > 0) {
    out += `--- REJECTIONS ---\n`;
    report.rejections.forEach(r => {
      out += `- ${r.material} (${r.country}) via ${r.source}: ${r.reason}\n`;
    });
  }

  return out;
}
