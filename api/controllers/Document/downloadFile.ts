import path from "path";
import fs from 'fs';

export async function downloadFile(req:any, res: any) {
    try{
        const  filename  = req.params.filename;
        const fileExt = path.extname(filename)
        const folderName = fileExt.toLowerCase() === '.pdf'? 'files' : 'images';
        const filePath = path.join(__dirname, `../../public/${folderName}/${filename}`);
        
        if(!fs.existsSync(filePath)){
            return res.status(404).json({ error: 'File not found' });
        }
    
    
        // Set the appropriate headers for the download
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', `application/${fileExt.split('.')[1]}`); // Adjust the content type based on your file type
    
        // Stream the file to the response
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (err: any){
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
}