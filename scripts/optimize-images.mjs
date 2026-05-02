/**
 * Image Optimization Script for Polkadot College
 * Uses sharp to resize, compress, and convert images to WebP.
 * 
 * Strategy:
 * - Hero/Renders: max 1920px wide, quality 80
 * - Photos (PBA events): max 1440px wide, quality 75
 * - Portraits: max 800px wide, quality 80
 * - Logos: max 200px wide, quality 90 (PNG preserved for transparency)
 * - Videos: untouched (handled separately)
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename } from 'path';

const ASSETS_DIR = join(import.meta.dirname, '..', 'public', 'assets', 'images');
const BACKUP_DIR = join(import.meta.dirname, '..', 'public', 'assets', 'images_original');

/** Classification rules — maps filename patterns to optimization settings */
const RULES = [
  {
    pattern: /Render/i,
    label: 'RENDER',
    maxWidth: 1920,
    quality: 80,
    format: 'webp',
  },
  {
    pattern: /hero/i,
    label: 'HERO',
    maxWidth: 1920,
    quality: 80,
    format: 'webp',
  },
  {
    pattern: /portrait|retrato/i,
    label: 'PORTRAIT',
    maxWidth: 800,
    quality: 80,
    format: 'webp',
  },
  {
    pattern: /logo|Logo/,
    label: 'LOGO',
    maxWidth: 400,
    quality: 90,
    format: 'png', // Keep PNG for transparency
  },
  {
    pattern: /\.(jpg|jpeg|JPG|png|PNG)$/i,
    label: 'PHOTO',
    maxWidth: 1440,
    quality: 75,
    format: 'webp',
  },
];

/**
 * Classify an image file based on its filename
 * @param {string} filename
 * @returns {{ label: string, maxWidth: number, quality: number, format: string }}
 */
function classify(filename) {
  for (const rule of RULES) {
    if (rule.pattern.test(filename)) return rule;
  }
  return { label: 'OTHER', maxWidth: 1440, quality: 75, format: 'webp' };
}

/**
 * Format bytes to human-readable string
 * @param {number} bytes
 * @returns {string}
 */
function formatSize(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

async function main() {
  console.log('🖼  Polkadot College — Image Optimizer\n');

  // Create backup directory
  await mkdir(BACKUP_DIR, { recursive: true });
  console.log(`📁 Backup dir: ${BACKUP_DIR}\n`);

  const files = await readdir(ASSETS_DIR);
  const imageFiles = files.filter((f) => /\.(png|jpg|jpeg|JPG|PNG)$/i.test(f));

  console.log(`Found ${imageFiles.length} images to optimize\n`);
  console.log('─'.repeat(80));

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of imageFiles) {
    const inputPath = join(ASSETS_DIR, file);
    const backupPath = join(BACKUP_DIR, file);
    const fileStat = await stat(inputPath);
    const beforeSize = fileStat.size;
    totalBefore += beforeSize;

    const rule = classify(file);
    const ext = extname(file);
    const base = basename(file, ext);

    // Determine output filename
    const outputExt = rule.format === 'webp' ? '.webp' : '.png';
    const outputFilename = rule.format === 'webp' ? `${base}.webp` : file;
    const outputPath = join(ASSETS_DIR, outputFilename);

    try {
      // Get original dimensions
      const metadata = await sharp(inputPath).metadata();
      const origW = metadata.width || 0;
      const origH = metadata.height || 0;

      // Backup original
      await sharp(inputPath).toFile(backupPath);

      // Process: resize if needed + compress
      let pipeline = sharp(inputPath);

      if (origW > rule.maxWidth) {
        pipeline = pipeline.resize(rule.maxWidth, null, {
          withoutEnlargement: true,
          fit: 'inside',
        });
      }

      if (rule.format === 'webp') {
        pipeline = pipeline.webp({ quality: rule.quality, effort: 6 });
      } else {
        pipeline = pipeline.png({ quality: rule.quality, compressionLevel: 9 });
      }

      await pipeline.toFile(outputPath === inputPath ? inputPath + '.tmp' : outputPath);

      // If same path, replace
      if (outputPath === inputPath) {
        const { rename, unlink } = await import('fs/promises');
        await unlink(inputPath);
        await rename(inputPath + '.tmp', inputPath);
      }

      // Remove original if format changed
      if (outputFilename !== file && outputPath !== inputPath) {
        const { unlink } = await import('fs/promises');
        await unlink(inputPath).catch(() => {});
      }

      const afterStat = await stat(outputPath);
      const afterSize = afterStat.size;
      totalAfter += afterSize;

      const savings = ((1 - afterSize / beforeSize) * 100).toFixed(0);
      const newMeta = await sharp(outputPath).metadata();

      console.log(
        `✅ [${rule.label.padEnd(8)}] ${file.substring(0, 45).padEnd(46)} ` +
        `${origW}×${origH} → ${newMeta.width}×${newMeta.height}  ` +
        `${formatSize(beforeSize)} → ${formatSize(afterSize)} (−${savings}%)`
      );
    } catch (err) {
      totalAfter += beforeSize;
      console.log(`❌ [ERROR   ] ${file}: ${err.message}`);
    }
  }

  console.log('─'.repeat(80));
  const totalSavings = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
  console.log(
    `\n📊 Total: ${formatSize(totalBefore)} → ${formatSize(totalAfter)} (−${totalSavings}%)`
  );
  console.log(`💾 Originals backed up to: images_original/`);
  console.log('\n✨ Done! Update component imports to use .webp extensions.');
}

main().catch(console.error);
